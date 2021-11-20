const { ApolloServer } = require('apollo-server')

const connection = require('./config/connections')
const schema = require('./service/graphql')

connection()

const server = new ApolloServer({
  schema
})

server.listen().then(({ port }) => {
  console.log(`Server ready at port`, port)
})