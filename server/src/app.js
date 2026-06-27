const db = require('./config/db')
const express = require('express')
const notesRouter = require('./routes/notesRouter')
const tasksRouter = require('./routes/tasksRouter')
const focusRouter = require('./routes/focusRouter')
const analyticsRouter = require('./routes/analyticsRouter')
const usersRouter = require('./routes/usersRouter')
const loginRouter = require('./routes/loginRouter')
const middleware = require('./middleware')
const cors = require('cors')
const app = express()

db.connectDB()

app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.static('dist'))
app.use('/api/tasks', tasksRouter)
app.use('/api/notes', notesRouter)
app.use('/api/focusSession', focusRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)


module.exports = app