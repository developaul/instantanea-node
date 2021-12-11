const { ApolloError } = require("apollo-server-errors")

const Publication = require("../../../../datalayer/actuators/publication")

const Query = {
  getPublications: (_, args) =>
    Publication.getPublications(args)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getShortPublications: (_, args) =>
    Publication.getShortPublications(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Query }