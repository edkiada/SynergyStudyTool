const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const verifyToken = async (token) => {
  if(!token) {
    throw new Error('TokenMissing')
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id) {
      throw new Error('TokenInvalid')
    }

    const user = await User.findById(decodedToken.id)
    if(!user) {
      throw new Error('userNotFind')
    }
    return user

  } catch(error) {
    throw error
  }
}
module.exports = {
  verifyToken
}