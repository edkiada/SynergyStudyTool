const db = require('./config/db')
const express = require('express')
const notesRouter = require('./routes/notesRouter')
const tasksRouter = require('./routes/tasksRouter')
const middleware = require('./middleware')
const app = express()

db.connectDB()

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tasks', tasksRouter)
app.use('/api/notes', notesRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)


module.exports = app