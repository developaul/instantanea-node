const { ApolloError } = require("apollo-server-errors")
const user = require("../../../../datalayer/actuators/user")

const Query = {
  getUser: (_, __, context) =>
    user.getUser(context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getUserByUserName: (_, args, context) =>
    user.getUserByUserName(args, context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getSuggestedUsers: (_, __, context) =>
    user.getSuggestedUsers(context)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Query }