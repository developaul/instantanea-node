const bcryptjs = require('bcryptjs')

const UserModel = require('../../models/mongo/user')
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
}

module.exports = new User()