
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
  const user = require('./UserResolver');
  export const Itemresolvers = {
   
      list: () => todoList.items,
   
   
      createItem(_, {title, description, status,userId}: MutationCreateItemArgs) {
        const item = {id: uuid.v1(), title, description, status, userId}
        var connected = user.Userresolvers.isConnected(userId);
        if(connected)
        todoList.items.push(item)
        return item
     },
      updateItem(_, {id, title, description, status,userId}: MutationUpdateItemArgs) {
        const item = todoList.items.find(i => i.id === id)
        var connected = user.Userresolvers.isConnected(userId);
        if(connected && (item.userId ==  userId))
        if(item) {
          item.title = title
          item.description = description
          item.status = status
          return item
        }
        throw new Error('Item not found');
      },
      deleteItem(_, {id,userId}: MutationDeleteItemArgs) {

        const idx = todoList.items.findIndex(i => i.id === id)
       //return idx;
        var connected = user.Userresolvers.isConnected(userId);
        if((idx !== -1)&&(todoList.items[idx].userId == userId) &&(connected) ) {
          todoList.items.splice(idx, 1)
          return `Item ${id} deleted with success`
        }
        throw new Error('Id not found');
      },

      getItemByUser(_,{userId}:QueryGetItemByUser) {
        const idx = todoList.items.filter(i => i.userId === userId)
        if(idx.length !== 0) {
         
          return idx;
        }
        throw new Error(' Item with UserId not found');
      },
      getSharedItemByUser(_,{userId}:QueryGetItemByUser) {
        var sharedItems = [];
        todoList.items.forEach(function (item) {
          item.sharedUsers.forEach(function (i) {
               if(i==userId){
                 sharedItems.push(item);
               }
          });
      });
      return sharedItems;
      
      },
       // changer l'etat de status
      completeItem(_,{id,status,userId}:MutationCompleteItemArgs) {
        const item = todoList.items.find(i => i.id === id)
        if(item) {
          item.status = status
          return item
        }
        throw new Error('Item not found');
      }, 
      shareItem(_,{id,userId}:MutationShareItem) {
        const item = todoList.items.find(i => i.id == id)
        var connected = user.Userresolvers.isConnected(userId);
        if(item && (item.userId == userId) && connected) {
          item.sharedUsers.push(userId);
          return item
        }
      } , 

      commentItem(_,{id,userId,description}:MutationCommentItem) {
        const item = todoList.items.find(i => i.id == id)
        var connected = user.Userresolvers.isConnected(userId);
        if(item && (item.userId == userId) && connected) {
            item.description = description           
            return item       
      }
      throw new Error('Item not found');
    }
   
  };
 