const FollowedModel = require("../../models/mongo/followed")

class Followed {
  async createFollowed(userId) {
    try {
      await FollowedModel.create({
        userId
      })
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Followed()