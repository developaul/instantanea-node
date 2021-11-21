const { Schema, model } = require('mongoose')

const FollowerSchema = require('./follower')

const FollowingSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followingIds: {
    default: [],
    type: [FollowerSchema]
  }
}, { timestamps: true })

module.exports = model('Following', FollowingSchema)