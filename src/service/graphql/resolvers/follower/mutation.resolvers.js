const { ApolloError } = require("apollo-server-errors");

const follower = require("../../../../datalayer/actuators/follower");

const Mutation = {
  createFollower: (_, args, context) =>
    follower.createFollower(args, context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  removeFollow: (_, args, context) =>
    follower.removeFollow(args, context)
      .catch(error => {
        throw new ApolloError(error)
      }),

}

module.exports = { Mutation }