const jwt = require('jsonwebtoken')

const generateToken = ({ userId, secretWord, expiresIn }) => {
  return jwt.sign({ userId }, secretWord, { expiresIn })
}

module.exports = {
  generateToken
}