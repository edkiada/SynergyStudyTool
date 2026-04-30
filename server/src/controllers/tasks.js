const Task = require('../models/task')

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task
      .find({})
    res.json(tasks)
  } catch(error) {
    next(error)
  }
}

const createTask = async (req, res, next) => {
  try {
    const body = req.body
    const task = new Task({
      title: body.title,
      priority: body.priority || "medium"
    })
    const response = await task.save()
    res.status(201).json(response)
  } catch(error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const task_id = req.params.id
    const updateData = req.body

    const task = await Task.findById(task_id)
    if(!task) {
      return res.status(404).json({ error: "not find task" })
    }
    Object.assign(task, updateData)

    await task.save()
    res.json(task)
  } catch(error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task_id = req.params.id
    const response = await Task.findByIdAndDelete(task_id)
    if (!response) {
      return res.status(404).json({
        status: 'error',
        message: '找不到任務'
      })
    }
    res.status(204).end()
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
}