const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://kadhem:MK3G27LRPRe6mK4@cluster0.pkvyo.mongodb.net/AOSTEST?retryWrites=true&w=majority';//mongodb://username:password@url:port/db_name?params

// Database Name
const dbName = 'AOSTEST';
const client = new MongoClient(url);
const DB = {};



DB.insert = function insert(data, destination) {
  const db = client.db(dbName);
  const collection = db.collection(destination);
  // Insert some documents
 return  collection.insertOne(data)
};

DB.delete = function (data, destination) {
  const db = client.db(dbName);
  const collection = db.collection(destination);
  // Delete some documents
  return collection.deleteOne(data);
};

DB.findDocuments = function (data, destination,cb) {
  
  const db = client.db(dbName);
  const collection = db.collection(destination);
  // Find all documents
   return collection.find(data).toArray();
};

DB.findAll = function (destination) {
 
    // Get the documents collection
    const db = client.db(dbName);
    const collection = db.collection(destination);
    // Find some documents
    return collection.find({}).toArray();
  
}
DB.findDocument = async function findDocument(data, destination) {
  const db = client.db(dbName);
  const collection = db.collection(destination);
  // find one document
  return collection.findOne(data);
};

DB.updateDocument = async function updateDocument(id, data, destination,cb) {
  const db = client.db(dbName);
  const collection = db.collection(destination);
  return collection.updateOne(id,data,destination);
 };

 DB.findOneAndUpdate = async function findOneAndUpdate(id, data, destination) {
  const db = client.db(dbName);
  const collection = db.collection(destination);

  return collection.findOneAndUpdate(id,data,{returnOriginal: false});
 };

DB.findAndModify = function (query,sort,update,destination) {
  const db = client.db(dbName);
  const collection = db.collection(destination);

  return collection.findAndModify({"query":query,
  "sort": sort,
  "update": update},{returnOriginal: false});
}

DB.connect = function connect(cb) {
  DB.client = client.connect(function (err) {
    if (err) console.log("DB:", err)
    else console.log("DB: succesfully")
  });
}

module.exports = DB;