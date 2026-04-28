const router = require('express').Router()
const tasksControllers = require('../controllers/tasks')

router.get('/', tasksControllers.getAllTasks)


module.exports = router
