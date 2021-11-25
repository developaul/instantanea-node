const PublicationModel = require('../../models/mongo/publication')

class Publication {
  async createPublication(publicationInput, context) {
    try {
      const { userId } = context.user

      const publication = await PublicationModel.create({
        ...publicationInput,
        createdBy: userId
      })

      return publication
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Publication()