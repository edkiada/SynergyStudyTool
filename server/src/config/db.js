const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('./env')

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI)
    logger.info(`✅ MongoDB 連線成功`)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  connectDB
}