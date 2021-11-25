
const { Schema, model } = require('mongoose')

const PublicationSchema = Schema({
  status: {
    type: String,
    default: 'published'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  media: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true })

module.exports = model('Publication', PublicationSchema)