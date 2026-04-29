const router = require('express').Router()
const tasksControllers = require('../controllers/tasks')

router.get('/', tasksControllers.getAllTasks)
router.post('/', tasksControllers.createTask)
router.put('/:id', tasksControllers.updateTask)
router.delete('/:id', tasksControllers.deleteTask)

module.exports = router
