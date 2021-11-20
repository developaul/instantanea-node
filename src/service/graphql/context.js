const jwt = require('jsonwebtoken')

const context = ({ req }) => {
  try {
    const token = req.headers['authorization'] || ''

    if (token) {
      const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_WORD)
      return {
        user
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = context