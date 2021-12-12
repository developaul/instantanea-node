const { ApolloError } = require("apollo-server-errors")

const Publication = require("../../../../datalayer/actuators/publication")

const Query = {
  getPublications: (_, args, context) =>
    Publication.getPublications(args, context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getShortPublications: (_, args) =>
    Publication.getShortPublications(args)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getPublication: (_, args) =>
    Publication.getPublication(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Query }