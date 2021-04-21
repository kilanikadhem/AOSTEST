const item = require('./itemresolver');
const user = require('./userResolver');

module.exports = {
  Query: {
    /*threads: threads.all,
    thread: threads.findOne,*/
    users : user.UserResolvers.listUser,
    getItemByUser: item.ItemResolvers.getItemByUser,
    getSharedItemByUser:  item.ItemResolvers.getSharedItemByUser,
    list : item.ItemResolvers.list

  },
  Mutation: {
    
    //User 
    createUser: user.UserResolvers.createUser,
    updateUser : user.UserResolvers.updateUser,
    deleteUser: user.UserResolvers.deleteUser,
    loginUser: user.UserResolvers.loginUser,
    logoutUser: user.UserResolvers.logoutUser,
    //Item
    createItem:  item.ItemResolvers.createItem,
    updateItem : item.ItemResolvers.updateItem,
    completeItem: item.ItemResolvers.completeItem,
    deleteItem : item.ItemResolvers.deleteItem,
    shareItem: item.ItemResolvers.shareItem,
    commentItem : item.ItemResolvers.commentItem,
    
  }
}