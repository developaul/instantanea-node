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

  async getPublications({ limit, page }, context) {
    try {
      const { userId } = context.user

      const publications = await PublicationModel.aggregate([
        {
          $match: { status: 'published' }
        },
        {
          $lookup: {
            let: { publicationId: '$_id' },
            from: 'publicationlikes',
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
                  as: 'createdBy'
                }
              },
              {
                $unwind: {
                  path: '$createdBy',
                  preserveNullAndEmptyArrays: true
                }
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
          $addFields: {
            currentUserLikes: {
              $reduce: {
                input: '$likes',
                initialValue: false,
                in: { $eq: ["$$this.createdBy._id", ObjectId(userId)] }
              }
            }
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

  async getShortPublications({ limit, page, userName }) {
    try {

      const { _id } = await UserModel.findOne({ userName }, { _id: 1 }).lean()

      const publications = await PublicationModel.aggregate([
        {
          $match: {
            status: 'published',
            createdBy: ObjectId(_id)
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

      return publications
    } catch (error) {
      throw error
    }
  }

  async getPublication({ publicationId }) {
    try {

      const [publication] = await PublicationModel.aggregate([
        {
          $match: {
            status: 'published',
            _id: ObjectId(publicationId)
          }
        },
        {
          $lookup: {
            let: { publicationId: '$_id' },
            from: 'commentLikes',
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

      return publication
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Publication()