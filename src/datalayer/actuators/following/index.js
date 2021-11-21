const followingModel = require("../../models/mongo/following")

class Following {
  async createFollowing(userId) {
    try {
      await followingModel.create({
        userId,
      })
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Following()