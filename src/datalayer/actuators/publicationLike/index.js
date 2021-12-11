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

  async removePublicationLike({ publicationLikeId }) {
    try {
      const publicationLike = await PublicationLikeModel.findOneAndDelete({
        _id: publicationLikeId
      }).lean()

      return publicationLike
    } catch (error) {
      throw error
    }
  }
}

module.exports = new PublicationLike()