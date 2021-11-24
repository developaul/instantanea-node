const bcryptjs = require('bcryptjs')
const { Types: { ObjectId } } = require('mongoose')

const UserModel = require('../../models/mongo/user')
const FollowerModel = require('../../models/mongo/follower')

const { generateToken } = require('../../../utils')

class User {
  async authenticateUser({ email, password }) {
    try {
      const user = await UserModel.findOne({ email }).lean()

      if (!user) throw new Error('Email o password incorrecto')

      const isValidPassword = bcryptjs.compareSync(password, user.password)
      if (!isValidPassword) throw new Error('Email o password incorrecto')

      return {
        token: generateToken({ userId: user._id, secretWord: process.env.SECRET_WORD, expiresIn: '24h' }),
        user
      }
    } catch (error) {
      throw error
    }
  }

  async createUser(userInput) {
    try {
      const { userName, email, password } = userInput

      const userFound = await UserModel.exists({ $or: [{ userName }, { email }] })
      if (userFound) throw new Error('El usuario ya esta registrado')

      const salt = bcryptjs.genSaltSync(10)
      userInput.password = bcryptjs.hashSync(password, salt)

      const user = await UserModel.create(userInput)

      return {
        token: generateToken({ userId: user._id, secretWord: process.env.SECRET_WORD, expiresIn: '24h' }),
        user
      }
    } catch (error) {
      throw error
    }
  }

  async getUser(context) {
    try {
      const { userId } = context.user

      const user = await UserModel.findOne({ _id: userId }).lean()

      if (!user) throw new Error('El usuario no existe')

      return user
    } catch (error) {
      throw error
    }
  }

  async getUserByUserName({ userName }, context) {
    try {
      const { userId } = context.user

      const [[user], currentUserIsFollowing] = await Promise.all([
        UserModel.aggregate([
          {
            $match: {
              userName
            }
          },
          {
            $lookup: {
              let: { userId: '$_id' },
              from: 'followers',
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$$userId', '$followee'] },
                      ]
                    }
                  },
                },
                {
                  $count: 'followers'
                }
              ],
              as: 'followers'
            }
          },
          {
            $lookup: {
              let: { userId: '$_id' },
              from: 'followers',
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$$userId', '$follower'] }
                      ]
                    }
                  },
                },
                {
                  $count: 'following'
                }
              ],
              as: 'following'
            }
          },
          {
            $unwind: {
              path: '$following',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $unwind: {
              path: '$followers',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 1,
              email: 1,
              userName: 1,
              firstName: 1,
              lastName: 1,
              photo: 1,
              createdAt: 1,
              updatedAt: 1,
              description: 1,
              followers: '$followers.followers',
              following: '$following.following'
            }
          }
        ]),
        FollowerModel.exists({ follower: ObjectId(userId) })
      ])

      user.currentUserIsFollowing = currentUserIsFollowing
      return user
    } catch (error) {
      throw error
    }
  }

  async getSuggestedUsers(context) {
    try {
      const { userId } = context.user

      const followeds = await FollowerModel.find({ follower: ObjectId(userId) }, { _id: 0, followee: 1 }).lean()
      const followedsIds = followeds.map(({ followee }) => ObjectId(followee))
      followedsIds.push(ObjectId(userId))

      const users = await UserModel.find({
        _id: { $nin: followedsIds }
      }).sort({ createdAt: -1 }).limit(4).lean()

      return users
    } catch (error) {
      throw error(error)
    }
  }
}

module.exports = new User()