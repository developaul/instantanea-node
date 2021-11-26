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

  async getPublications({ limit, page }) {
    try {

      const publications = await PublicationModel.aggregate([
        {
          $match: { status: 'published' }
        },
        {
          $lookup: {
            let: { publicationId: '$_id' },
            from: 'likes',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$$publicationId', '$publicationId'] },
                    ]
                  }
                },
              },
              {
                $count: 'likes'
              }
            ],
            as: 'likes'
          }
        },
        {
          $lookup: {
            let: { publicationId: '$_id' },
            from: 'comments',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$$publicationId', '$publicationId'] },
                    ]
                  }
                },
              },
              {
                $lookup: {
                  let: { userId: '$createdBy' },
                  from: 'users',
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ['$$userId', '$_id'] },
                          ]
                        }
                      },
                    }
                  ],
                  as: 'user'
                }
              },
              {
                $unwind: {
                  path: '$user',
                  preserveNullAndEmptyArrays: true
                }
              }
            ],
            as: 'comments'
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $skip: ((page - 1) * limit)
        },
        {
          $limit: limit
        }
      ])

      return publications
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Publication()