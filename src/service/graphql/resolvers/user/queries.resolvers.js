// createUser: async (_, args) =>
// User.createUser(args)
//   .catch(error => {
//     throw new ApolloError(error)
//   }),

const User = require("../../../../datalayer/actuators/user")

const Query = {
  getUserById: (_, args) =>
    User.getUserById(args)
      .catch(error => {
        throw new ApolloError(error)
      })
}

module.exports = { Query }