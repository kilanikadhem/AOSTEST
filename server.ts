import * as fs from "fs"
import * as path from 'path'
import * as express from "express"
import { ApolloServer } from 'apollo-server-express'
var DB = require('./config/demo_create_mongo_db')

const resolvers = require('./resolvers');
const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8").toString()

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
console.log(DB.connect());

server.applyMiddleware({ app })



app.get('/test/:email/:password', function (req, res,next) {
  console.log('test param', req.params)
  DB.findDocument({ "email": req.params.email, "password": req.params.password }, 'users',(res)=>{
    console.log("kk", res)
  })
 

  res.send(req.params)
})
app.listen(4000, "0.0.0.0", () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)