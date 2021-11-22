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
      })
}

module.exports = { Query }