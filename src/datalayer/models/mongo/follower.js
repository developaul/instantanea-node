
const { Schema } = require('mongoose')

const FollowerSchema = Schema({
  type: {
    type: String,
    required: true,
    enum: ['User']
  },
  status: {
    type: String,
    required: true,
    default: 'actived',
    enum: ['actived']
  },
  refId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = FollowerSchema