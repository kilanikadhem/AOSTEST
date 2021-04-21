
import {
  MutationLoginArgs,
  MutationCreateUserArgs,
  MutationLogoutArgs,
  MutationUpdateUserArgs,
  MutationDeleteUserArgs
} from '../graphql-types'
import * as uuid from 'uuid'

const UserList = require('../data/user.json')

export const Userresolvers = {
 
    listUser: () => UserList.users,
 
 
    createUser(_, { name, lastName, email, password }: MutationCreateUserArgs) {
      const user = { id: uuid.v1(), name, lastName, email, password }
      UserList.users.push(user)
      return user
    },
    updateUser(_, {id,name, lastName, email, password}: MutationUpdateUserArgs) {
      const user =  UserList.users.find(i => i.id === id)
      if(user) {
        user.name = name
        user.lastName = lastName
        user.email = email
        user.password = password
        return user
      }
      throw new Error('user not found');
    },
    deleteUser(_, {id}: MutationDeleteUserArgs) {

      const idx =  UserList.users.findIndex(i => i.id === id)

      if((idx !== -1)) {
        UserList.users.splice(idx, 1)
        return `User ${id} deleted with success`
      }
      throw new Error('Id not found');
    },

    loginUser(_, { login, password }: MutationLoginArgs) {
    var exist = false;
      UserList.users.forEach(function (user) {
        if ((user.password == password) && (user.email == login))
        { user.status = "Connected"
         exist= true;}
      });
      return exist;
    }, 
    logoutUser(_, { userId }: MutationLogoutArgs) {
      var exist = false;
        UserList.users.forEach(function (user) {
          if ((user.userId == userId))
          { user.status = " Not Connected"
           exist= true;}
        });
        return exist;
      }, 
    
    isConnected(userId) {
         var exist = false;      
         UserList.users.forEach(function (user) {
          if ((user.id == userId)&&(user.status == "Connected"))
           { exist= true;}
        });
        return exist;
    }
  };

