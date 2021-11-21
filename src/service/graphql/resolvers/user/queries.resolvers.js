const User = require("../../../../datalayer/actuators/user")

const Query = {
  getUser: (_, __, context) =>
    User.getUser(context)
      .catch(error => {
        throw new ApolloError(error)
      }),
  getUserByUserName: (_, args) =>
    User.getUserByUserName(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Query }