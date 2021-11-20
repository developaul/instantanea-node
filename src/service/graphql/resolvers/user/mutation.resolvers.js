const { ApolloError } = require("apollo-server-errors");

const User = require("../../../../datalayer/actuators/user");

const Mutation = {
  createUser: async (_, args) =>
    User.createUser(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Mutation }