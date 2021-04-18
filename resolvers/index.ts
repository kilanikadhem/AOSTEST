const item = require('./Itemresolvers');
const user = require('./UserResolver');

module.exports = {
  Query: {
    /*threads: threads.all,
    thread: threads.findOne,*/
    users : user.Userresolvers.listUser,
    getItemByUser: item.Itemresolvers.getItemByUser,
    getSharedItemByUser:  item.Itemresolvers.getSharedItemByUser,
    list : item.Itemresolvers.list

  },
  Mutation: {
    
    //User 
    createUser: user.Userresolvers.createUser,
    updateUser : user.Userresolvers.updateUser,
    deleteUser: user.Userresolvers.deleteUser,
    loginUser: user.Userresolvers.loginUser,
    logoutUser: user.Userresolvers.logoutUser,
    //Item
    createItem:  item.Itemresolvers.createItem,
    updateItem : item.Itemresolvers.updateItem,
    EndItem: item.Itemresolvers.completeItem,
    deleteItem : item.Itemresolvers.deleteItem,
    shareItem: item.Itemresolvers.shareItem,
    commentItem : item.Itemresolvers.commentItem
  }
}