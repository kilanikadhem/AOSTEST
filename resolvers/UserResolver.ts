
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

export const UserResolvers = {

   async listUser(){
   
    return new Promise(async(resolve,reject)=>{
      
      const res = await DB.findAll("users");
      console.log(res);
      resolve(res);
    });
  
  
   
},
  


  createUser(_, { name, lastName, email, password }: MutationCreateUserArgs) {
   
    return new Promise(async(resolve,reject)=>{
      
      const res = await DB.insert({'name':name,'lastName':name,'email':email,'password':password},"users");
      console.log( "Inside INsert",res);
      resolve(res.ops[0]);
    });
  },
  updateUser(_, { id, name, lastName, email, password }: MutationUpdateUserArgs) {
    return new Promise(async(resolve,reject)=>{
      var updatedValue ={};
       if(name){updatedValue['name'] = name}
       if(lastName){updatedValue['lastName'] = lastName}
       if(email){updatedValue['email'] = email}
       if(password){updatedValue['password'] = password}
       console.log(updatedValue)   ;
          const res = await DB.findOneAndUpdate({"_id":ObjectId(id)},{ $set:updatedValue},"users");
      console.log( "Inside Updated",res.value,updatedValue);
      resolve(res.value);
    });
  },

  deleteUser(_, { id }: MutationDeleteUserArgs) {

    return new Promise(async(resolve,reject)=>{
          const res = await DB.delete({"_id":ObjectId(id)},"users");
      console.log( "Inside delete",res);
      resolve(res.deletedCount);
    });
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
      const res = await DB.findOneAndUpdate({"_id":ObjectId(userId) }, { $set: { "status": " Not Connected" }} ,'users');
       console.log(res.value);
      resolve(res.value);
    });

  },

  isConnected(userId) {
   
    return new Promise(async(resolve,reject)=>{
      console.log("UserID in Is Connected",userId);
      const res = await DB.findDocument({'_id':ObjectId(userId),'status':"Connected"}, 'users');
       console.log("isConnected",res);
      resolve(res);
      reject({"userId":null})
  });
  }
};

