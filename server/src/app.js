const db = require('./config/db')
const express = require('express')
const tasksRouter = require('./routes/TasksRouter')
const app = express()

db.connectDB()


app.use('/api/tasks', tasksRouter)


module.exports = app