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
        token: generateToken({ userId: _id, secretWord: process.env.SECRET_WORD, expiresIn: '24h' }),
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

      const user = new UserModel(userInput)
      await user.save()

      return user
    } catch (error) {
      throw error
    }
  }

  async getUserById({ userId }) {
    try {
      const user = await UserModel.findOne({ _id: userId }).lean()

      if (!user) throw new Error('El usuario no existe')

      return user
    } catch (error) {
      throw error
    }
  }
}

module.exports = new User()