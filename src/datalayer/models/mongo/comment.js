
const { Schema, model } = require('mongoose')

const CommentSchema = Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  publicationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Publication'
  },
  status: {
    type: String,
    default: 'published'
  },
  content: {
    type: String,
    requireD: true
  }
}, { timestamps: true })

module.exports = model('Comment', CommentSchema)