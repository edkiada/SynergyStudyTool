const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const userLogin = async(req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!(user)) {
      return res.status(401).json({ error: '帳號不存在' })
    }
    if(!(passwordCorrect)) {
      return res.status(401).json({ error: '密碼錯誤' })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
      token,
      username: user.username,
      name: user.name
    })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  userLogin
}