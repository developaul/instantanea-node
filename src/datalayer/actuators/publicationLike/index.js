const { Types: { ObjectId } } = require('mongoose')

const PublicationLikeModel = require('../../models/mongo/publicationLike')

class PublicationLike {
  async createPublicationLike({ publicationId }, context) {
    try {
      const { userId } = context.user

      const publicationLike = await PublicationLikeModel.create({
        publicationId,
        createdBy: ObjectId(userId)
      })

      return publicationLike
    } catch (error) {
      throw error
    }
  }

  async removePublicationLike({ publicationId }, context) {
    try {
      const { userId } = context.user

      const publicationLike = await PublicationLikeModel.findOneAndDelete({
        publicationId,
        createdBy: userId
      }).lean()

      return publicationLike
    } catch (error) {
      throw error
    }
  }
}

module.exports = new PublicationLike()