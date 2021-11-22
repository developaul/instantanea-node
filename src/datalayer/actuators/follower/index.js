const { Types: { ObjectId } } = require('mongoose')

const FollowerModel = require("../../models/mongo/follower")

class Follower {
  async createFollower({ followeeId }, context) {
    try {
      const { user } = context
      const { userId } = user

      await FollowerModel.create({
        follower: ObjectId(userId),
        followee: ObjectId(followeeId),
      })

      return 'todo ok'
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Follower()