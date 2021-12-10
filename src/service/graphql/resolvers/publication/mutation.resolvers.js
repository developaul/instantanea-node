const { ApolloError } = require("apollo-server-errors");

const publication = require("../../../../datalayer/actuators/publication");

const Mutation = {
  createPublication: (_, args, context) =>
    publication.createPublication(args, context)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Mutation }