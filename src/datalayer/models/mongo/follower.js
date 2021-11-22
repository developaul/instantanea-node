
const { Schema, model } = require('mongoose')

const FollowerSchema = Schema({
  follower: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    default: 'actived',
    enum: ['actived']
  },
}, { timestamps: true })

module.exports = model('Follower', FollowerSchema)