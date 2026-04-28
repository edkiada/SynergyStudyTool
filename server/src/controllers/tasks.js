const Task = require('../models/task')

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task
      .find({})
    res.json(tasks)
  } catch(error) {
    console.log('wrong')
  }
}

module.exports = {
  getAllTasks
}