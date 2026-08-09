require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'prod'
  ? process.env.PROD_MONGODB_URI
  : process.env.MONGODB_URI

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

module.exports = {
  PORT,
  MONGODB_URI,
  GEMINI_API_KEY
}
