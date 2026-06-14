const focusModel = require('../models/focusSession')

class FocusEngineService {
  static async deleteFocusSessionByTaskId(taskId) {
    await focusModel.deleteMany({
      'source.refId': taskId
    })
  }
}

module.exports = FocusEngineService