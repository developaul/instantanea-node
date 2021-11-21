const { Schema, model } = require('mongoose')

const FollowerSchema = require('./follower')

const FollowedSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followedIds: {
    default: [],
    type: [FollowerSchema]
  }
}, { timestamps: true })

module.exports = model('Followed', FollowedSchema)