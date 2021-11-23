const { Types: { ObjectId } } = require('mongoose')

const FollowerModel = require("../../models/mongo/follower")

class Follower {
  async createFollower({ followeeId }, context) {
    try {
      const { userId } = context.user

      const follower = await FollowerModel.create({
        follower: ObjectId(userId),
        followee: ObjectId(followeeId),
      })

      return follower
    } catch (error) {
      throw error
    }
  }

  async removeFollow({ followeeId }, context) {
    try {
      const { userId } = context.user

      const follower = await FollowerModel.findOneAndDelete({
        followee: followeeId,
        follower: userId
      }).lean()

      return follower
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Follower()