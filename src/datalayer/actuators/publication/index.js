const { Types: { ObjectId } } = require('mongoose')
const PublicationModel = require('../../models/mongo/publication')
const UserModel = require('../../models/mongo/user')

class Publication {
  async createPublication(publicationInput, context) {
    try {
      const { userId } = context.user

      const [publication, user] = await Promise.all([
        PublicationModel.create({
          ...publicationInput,
          createdBy: userId
        }),
        UserModel.findById(userId).lean()
      ])

      return {
        ...publication,
        createdBy: user
      }
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
              },
            ],
            as: 'createdBy'
          }
        },
        {
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true
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

  async getShortPublications({ limit, page, userId }) {
    try {

      const publications = await PublicationModel.aggregate([
        {
          $match: {
            status: 'published',
            createdBy: ObjectId(userId)
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
        },
        {
          $project: {
            _id: 1,
            media: 1,
            description: 1
          }
        }
      ])

      console.log("🚀 ~ getShortPublications ~ publications", publications)

      return publications
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Publication()