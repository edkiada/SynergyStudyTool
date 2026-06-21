const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const verifyToken = async (token) => {
  if(!token) {
    const error = new Error('TokenMissing')
    error.name = 'TokenMissing'
    throw error
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id) {
      const error = new Error('TokenInvalid')
      error.name = 'TokenInvalid'
      throw error
    }

    const user = await User.findById(decodedToken.id)
    if(!user) {
      const error = new Error('userNotFind')
      error.name = 'userNotFind'
      throw error
    }
    return user

  } catch(error) {
    if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      const tokenError = new Error('TokenInvalid')
      tokenError.name = 'TokenInvalid'
      throw tokenError
    }
    throw error
  }
}
module.exports = {
  verifyToken
}