const { ApolloServer } = require('apollo-server')

const schema = require('./service/graphql')

const server = new ApolloServer({
  schema
})

server.listen().then(({ port }) => {
  console.log(`Server ready at port`, port)
})