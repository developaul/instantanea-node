
const { Schema, model } = require('mongoose')

const PublicationLikeSchema = Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  publicationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Publication'
  }
}, { timestamps: true })

module.exports = model('PublicationLike', PublicationLikeSchema)