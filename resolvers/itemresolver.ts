
import {
  MutationCreateItemArgs,
  MutationUpdateItemArgs,
  MutationDeleteItemArgs,
  MutationCompleteItemArgs,
  QueryGetItemByUser,
  MutationShareItem,
  MutationCommentItem

} from '../graphql-types'
import * as uuid from 'uuid'

const todoList = require('../data/list.json')
const user = require('./userResolver');
var DB = require('../config/demo_create_mongo_db')
var ObjectId = require('mongodb').ObjectId

export const ItemResolvers = {

  list: () => {
    return new Promise(async (resolve, reject) => {

      const res = await DB.findAll("items");
      console.log(res);
      resolve(res);
    });

  },

  // Mongo
  createItem(_, { title, description, status, userId }: MutationCreateItemArgs) {
    return new Promise(async (resolve, reject) => {
      const res = await DB.insert({ 'title': title, 'description': description, 'status': status, 'userId': userId }, "items");
      console.log("Inside INsert", res.ops[0]);
      resolve(res.ops[0]);
    });
  },

  updateItem(_, { id, title = undefined, description, status = undefined, userId }: MutationUpdateItemArgs) {
    return new Promise(async (resolve, reject) => {
      var updatedValue = {};
      if (title) { updatedValue['title'] = title }
      if (description) { updatedValue['description'] = description }
      if (status) { updatedValue['status'] = status }
      if (userId) { updatedValue['userId'] = userId }
      let isConnected = await user.UserResolvers.isConnected(userId);
      if (isConnected !== null) {
        const res = await DB.findOneAndUpdate({ "_id": ObjectId(id), "userId": userId }, { $set: updatedValue }, "items");
        resolve(res.value);
      }
      resolve(new Error('Id not found or error in User Status'));
    });



  },

  deleteItem(_, { id, userId }: MutationDeleteItemArgs) {
    return new Promise(async (resolve, reject) => {
      let isConnected = await user.UserResolvers.isConnected(userId);
      if (isConnected !== null) {
        const res = await DB.delete({ "_id": ObjectId(id), "userId": userId }, "items");
        console.log("Inside delete", res);
        resolve(res.deletedCount);
      }else {
      throw new Error('Id not found');}
    });

  },

  getItemByUser(_, { userId }: QueryGetItemByUser) {
    return new Promise(async (resolve, reject) => {
      let isConnected = user.UserResolvers.isConnected(userId);
      if (isConnected) {
        const res = await DB.findDocuments({ "userId": userId }, "items");
        console.log(res);
        resolve(res);
      }
    });
  },

  getSharedItemByUser(_, { userId }: QueryGetItemByUser) {
    return new Promise(async (resolve, reject) => {
      var sharedItems = [];
      
      const res = await DB.findAll("items");
      
      res.forEach(function (item) {
        if(item.sharedUsers != undefined)
        item.sharedUsers.forEach(function (i) {
          if (i == userId) {
            sharedItems.push(item);
          }
        });
      });
      resolve(sharedItems);
    });
    
  },
  // changer l'etat de status 
  completeItem(_, { id, status, userId }: MutationCompleteItemArgs) {
  
    return new Promise(async (resolve, reject) => {
    
    resolve(ItemResolvers.updateItem(null, {"id":id,"status":status,"userId":userId}));
     
    });


  },
 
  shareItem(_, { id, userToShare, userId }: MutationShareItem) {

    return new Promise(async (resolve, reject) => {
     
      let isConnected = await user.UserResolvers.isConnected(userId);
      if (isConnected !== null) {
        const res = await DB.findDocument({ "_id": ObjectId(id), "userId": userId },"items");
        console.log("res",res);
         res.sharedUsers.push(userToShare);
        const res1 = await DB.findOneAndUpdate({ "_id": ObjectId(id), "userId": userId }, { $set: {"sharedUsers":  res.sharedUsers}}, "items");
        resolve(res1.value);
      }
      resolve(new Error('Id not found or error in User Status'));
    });

  },

  commentItem(_, { id, description, userId }: MutationCommentItem) {
    return new Promise(async (resolve, reject) => {
    
      resolve(ItemResolvers.updateItem(null, {"id":id,"description":description,"userId":userId}));
       
      });

  }

};
