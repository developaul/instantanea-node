const { ApolloError } = require("apollo-server-errors");

const PublicationLike = require("../../../../datalayer/actuators/publicationLike");

const Mutation = {
  createPublicationLike: (_, args, context) =>
    PublicationLike.createPublicationLike(args, context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  removePublicationLike: (_, args) =>
    PublicationLike.removePublicationLike(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Mutation }