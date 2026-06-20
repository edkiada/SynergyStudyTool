const FocusEngineService = require('./focusService')
const taskModel = require('../models/task')


  const deleteWholeTask = async (taskId) => {
    await FocusEngineService.deleteFocusSessionByTaskId(taskId);
    return await taskModel.findByIdAndDelete(taskId);
  }

  const sortTasksByCustom = (tasks) => {
    const priorityWeights = {
      'high': 3,
      'medium': 2,
      'low': 1
    }

    const sortedResults = [...tasks].sort((a, b) => {
      const priorityA = priorityWeights[a.priority] || 0;
      const priorityB = priorityWeights[b.priority] || 0;

      const iscompletedA = a.status === 'completed' ? 1 : 0;
      const iscompletedB = b.status === 'completed' ? 1 : 0;

      if (iscompletedA !== iscompletedB) {
        return iscompletedA - iscompletedB; 
      }
      else {
        return priorityB - priorityA;
      }
    })
    return sortedResults;
  }


module.exports = {
  deleteWholeTask,
  sortTasksByCustom
};