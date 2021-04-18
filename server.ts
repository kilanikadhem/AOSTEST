import * as fs from "fs" 
import * as path from 'path' 
import * as express from "express" 
import { ApolloServer } from 'apollo-server-express'


const resolvers = require('./resolvers');
const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8").toString() 

const server = new ApolloServer({ typeDefs , resolvers })

const app = express() 

server.applyMiddleware({ app }) 

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
) 