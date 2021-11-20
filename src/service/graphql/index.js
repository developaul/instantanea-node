const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')

const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.*'))
const typeDefsArray = loadFilesSync(path.join(__dirname, './**/*.graphql'))

const resolvers = mergeResolvers(resolversArray)
const typeDefs = mergeTypeDefs(typeDefsArray)

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs
})