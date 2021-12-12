const { Types: { ObjectId } } = require('mongoose')

const PublicationLikeModel = require('../../models/mongo/publicationLike')
const UserModel = require('../../models/mongo/user')

class PublicationLike {
  async createPublicationLike({ publicationId }, context) {
    try {
      const { userId } = context.user

      const [publicationLike, createdBy] = await Promise.all([
        PublicationLikeModel.create({
          publicationId,
          createdBy: ObjectId(userId)
        }),
        UserModel.findOne({ _id: ObjectId(userId) }).lean()
      ])

      return {
        ...publicationLike,
        createdBy
      }
    } catch (error) {
      throw error
    }
  }

  async removePublicationLike({ publicationId }, context) {
    try {
      const { userId } = context.user

      const [publicationLike, createdBy] = await Promise.all([
        PublicationLikeModel.findOneAndDelete({
          publicationId,
          createdBy: userId
        }).lean(),
        UserModel.findOne({ _id: ObjectId(userId) }).lean()
      ])

      return {
        ...publicationLike,
        createdBy
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = new PublicationLike()