const { ApolloError } = require("apollo-server-errors")

const Publication = require("../../../../datalayer/actuators/publication")

const Query = {
  getPublications: (_, args, context) =>
    Publication.getPublications(args)
      .catch(error => {
        throw new ApolloError(error)
      }),
}

module.exports = { Query }