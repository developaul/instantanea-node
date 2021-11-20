const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')

const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.*'))
const typeDefsArray = loadFilesSync(path.join(__dirname, './**/*.graphql'))

const resolvers = mergeResolvers(resolversArray)
const typeDefs = mergeTypeDefs(typeDefsArray)


// const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'))

// const typeDefs = mergeTypeDefs(typesArray, { all: true })


// import * as path from 'path'
// import { mergeTypeDefs } from '@graphql-tools/merge'
// import { loadFilesSync } from '@graphql-tools/load-files'

// const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.js'))
// const resolvers = mergeResolvers(resolversArray)

// export { resolvers }


// export {
//   typeDefs
// }

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs
})