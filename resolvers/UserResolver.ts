
import {
  MutationLoginArgs,
  MutationCreateUserArgs,
  MutationLogoutArgs,
  MutationUpdateUserArgs,
  MutationDeleteUserArgs
} from '../graphql-types'
import * as uuid from 'uuid'
import { exist } from 'mongodb/lib/gridfs/grid_store';

const UserList = require('../data/user.json')
var DB = require('../config/demo_create_mongo_db')
var ObjectId = require('mongodb').ObjectId

export const Userresolvers = {

   async listUser(){
   
    return new Promise(async(resolve,reject)=>{
      
      const res = await DB.findAll("users");
      console.log(res);
      resolve(res);
    });
  
  
   
},
  


  createUser(_, { name, lastName, email, password }: MutationCreateUserArgs) {
    const user = { id: uuid.v1(), name, lastName, email, password }
    UserList.users.push(user)
    return user
  },
  updateUser(_, { id, name, lastName, email, password }: MutationUpdateUserArgs) {
    const user = UserList.users.find(i => i.id === id)
    if (user) {
      user.name = name
      user.lastName = lastName
      user.email = email
      user.password = password
      return user
    }
    throw new Error('user not found');
  },
  deleteUser(_, { id }: MutationDeleteUserArgs) {

    const idx = UserList.users.findIndex(i => i.id === id)

    if ((idx !== -1)) {
      UserList.users.splice(idx, 1)
      return `User ${id} deleted with success`
    }
    throw new Error('Id not found');
  },

   async loginUser(_, { login, password }: MutationLoginArgs) {

   return new Promise(async(resolve,reject)=>{
      const res = await DB.findOneAndUpdate({ "email": login, "password": password }, { $set: { "status": "Connected" } }, 'users');
      resolve(res.value);
    });

  },

    async logoutUser(_, { userId }: MutationLogoutArgs) {

    return new Promise(async(resolve,reject)=>{
      console.log(userId);
      const res = await DB.findOneAndUpdate({"_id":userId }, { $set: { "status": " Not Connected" } }, 'users');
       console.log(res.value);
      resolve(res.value);
    });

  },

  isConnected(userId) {
   
    return new Promise(async(resolve,reject)=>{
      console.log(userId);
      const res = await DB.findDocument({'_id':ObjectId(userId),'status':"Connected"}, 'users');
       console.log("isConnected",res);
      resolve(res);
  });
  }
};

