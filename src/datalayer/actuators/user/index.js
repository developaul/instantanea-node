const bcryptjs = require('bcryptjs')

const UserModel = require('../../models/mongo/user')

class User {
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