const { ApolloServer } = require('apollo-server')

const context = require('./service/graphql/context')
const connection = require('./config/connections')
const schema = require('./service/graphql')

connection()

const server = new ApolloServer({
  schema,
  context
})

server.listen().then(({ port }) => {
  console.log(`Server ready at port`, port)
})