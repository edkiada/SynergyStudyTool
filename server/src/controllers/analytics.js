const Task = require('../models/task')
const FocusSession = require('../models/focusSession')

const getAnalytics = async (req, res, next) => {
  try {
    const { period = 'daily' } = req.query

    const StartOfToday = new Date()
    StartOfToday.setHours(0, 0, 0, 0)

    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    const [completedTasks, sessions] = await Promise.all([
      Task.find({
        completedAt: { $gte: StartOfToday, $lte: endOfToday}
      }),
      FocusSession.find({
        startTime: { $gte: StartOfToday, $lte: endOfToday }
      })
    ])

    const totalFocusMinutes = sessions.reduce((sum, s) => sum + s.duration, 0)
    res.status(200).json({
      period,
      range: {
        start: StartOfToday,
        end: endOfToday
      },
      summary: {
        totalFocusMinutes,
        completedTaskCount: completedTasks.length
      },
      details: {
        completedTasks: completedTasks.map(task => ({
          id: task._id,
          title: task.title,
          totalFocusedTime: task.totalFocusedTime
        }))
      }
    })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getAnalytics
}