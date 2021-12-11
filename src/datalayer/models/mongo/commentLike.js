
const { Schema, model } = require('mongoose')

const CommentLikeSchema = Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Comment'
  }
}, { timestamps: true })

module.exports = model('CommentLike', CommentLikeSchema)