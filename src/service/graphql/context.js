const { AuthenticationError } = require('apollo-server-errors')
const jwt = require('jsonwebtoken')

const publicQueries = [
  'authenticateUser',
  'createUser',
]

const context = ({ req }) => {
  try {
    const { body, headers } = req
    const { operationName } = body

    if (publicQueries.includes(operationName))
      return { user: null }

    const token = headers['authorization']

    if (!token)
      throw new AuthenticationError('Token not found')

    const { userId } = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_WORD)

    return {
      user: {
        userId
      }
    }
  } catch (error) {
    throw new AuthenticationError('Invalid token')
  }
}

module.exports = context