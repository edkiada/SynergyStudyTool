const db = require('./config/db')
const express = require('express')
const tasksRouter = require('./routes/TasksRouter')
const middleware = require('./middleware')
const app = express()

db.connectDB()

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tasks', tasksRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)


module.exports = app