const bcrypt = require('bcrypt')
const User = require('../models/user')

const getAllUser = async(req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).json(user)
  } catch(error) {
    next(error)
  }
}

const createUser = async(req, res, next) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  createUser,
  getAllUser
}