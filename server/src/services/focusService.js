const focusModel = require('../models/focusSession')

const deleteFocusSessionByTaskId = async (taskId) => {
  await focusModel.deleteMany({
    'source.refId': taskId
  })
}

module.exports = {
  deleteFocusSessionByTaskId
}