const router = require('express').Router()
const tasksControllers = require('../controllers/tasks')
const middle = require('../middleware')

router.get('/', tasksControllers.getAllTasks)
router.post('/', middle.userExtractor, tasksControllers.createTask)
router.put('/:id', tasksControllers.updateTask)
router.delete('/:id', tasksControllers.deleteTask)

module.exports = router
