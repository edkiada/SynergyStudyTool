const Focus = require('../models/focusSession')
const Task = require('../models/task')

const createFocusSession = async (req, res, next) => {
  try {
    const body = req.body
    const focus = new Focus({
      startTime: Date.now(),
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