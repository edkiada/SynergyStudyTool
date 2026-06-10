const Focus = require('../models/focusSession')
const Task = require('../models/task')

const getCalendarFocusSessions = async (req, res, next) => {
  try {
    const { year, month, day } = req.query
    const startOfDay = new Date(year, month, day, 0, 0, 0)
    const endOfDay = new Date(year, month, day, 23, 59, 59)

    const focusSessions = await Focus.find({
        startTime: { 
          $gte: startOfDay, 
          $lte: endOfDay 
        }
    })
    return res.status(200).json(focusSessions);
  } catch(error) {
    next(error)
  }
}

const getAllFocusSessions = async (req, res, next) => {
  try {
    const focusSessions = await Focus
      .find({})
    res.json(focusSessions)
  } catch(error) {
    next(error)
  }
}

const createFocusSession = async (req, res, next) => {
  try {
    const body = req.body
    const d = new Date(body.startTime)
    const focus = new Focus({
      startTime: body.startTime,
      duration: body.duration,
      source: body.source || { type: 'independent' }
    })

    const savedFocus = await focus.save()
    if (savedFocus.source.type !== 'independent' && savedFocus.source.refId) {
      const task = await Task.findById(savedFocus.source.refId)
      if (task) {
        task.totalFocusedTime += savedFocus.duration
        await task.save()
      }
    }
    res.status(201).json(savedFocus)
  } catch(error){
    next(error)
  }
}

module.exports = {
  createFocusSession,
  getAllFocusSessions,
  getCalendarFocusSessions
}