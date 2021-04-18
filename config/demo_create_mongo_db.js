var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/mydb"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
}); 
//dev complete task , 
// share task 
// verify when sharing is the user  
//Mongo 