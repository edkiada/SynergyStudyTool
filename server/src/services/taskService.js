const FocusEngineService = require('./focusService')
const taskModel = require('../models/task')
const Task = require('../models/task')

  const deleteWholeTask = async (taskId) => {
    await FocusEngineService.deleteFocusSessionByTaskId(taskId);
    return await taskModel.findByIdAndDelete(taskId);
  }

  const clearCompletedTask = async (curUserId) => {
    let task = [];
    if(curUserId) {
      task = await Task.find({ userId: curUserId});
    }
    const StartOfToday = new Date();
    StartOfToday.setHours(0, 0, 0, 0);
    const StartTime = StartOfToday.getTime();
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const EndTime = endOfToday.getTime();
    const displayTask = task.filter((task) => {
      if(task.status === 'pending') return true;
      if(task.completedAt) {
        const completedTime = new Date(task.completedAt).getTime();
        return completedTime >= StartTime && completedTime <= EndTime;
      }
      return false;
    })
    return displayTask;
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
  sortTasksByCustom,
  clearCompletedTask
};