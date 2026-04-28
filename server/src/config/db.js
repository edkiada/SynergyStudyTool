const mongoose = require('mongoose')
const config = require('./env')

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI)
    console.log(`✅ MongoDB 連線成功: ${conn.connection.host}`);
  } catch(error) {
    console.log('wrong')
  }
}

module.exports = {
  connectDB
}