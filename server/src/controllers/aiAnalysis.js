const Task = require('../models/task')
const FocusSession = require('../models/focusSession')
const Note = require('../models/note')
const config = require('../config/env')

const getTodayRange = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

const extractJson = (text) => {
  try {
    return JSON.parse(text)
  } catch(error) {
    const match = text.match(/\{[\s\S]*\}/)
    if(match) {
      return JSON.parse(match[0])
    }
    throw error
  }
}

const createEmptyAnalysis = () => ({
  headline: '今天還沒有可分析的紀錄',
  summary: '目前尚未建立任務、完成任務或記錄專注時段。可以先新增一個小任務，或啟動一次專注計時，讓今天的資料開始累積。',
  wins: ['你已經打開了分析面板，這代表你正在主動檢視自己的狀態。'],
  risks: ['目前資料不足，無法判斷任務完成度、專注品質或時間分配。'],
  suggestions: ['先建立一個今天最重要的任務。', '完成一段短時間專注後再回來查看分析。', '若今天是休息日，也可以把休息目標記錄成任務。'],
  metrics: {
    completedTaskCount: 0,
    createdTaskCount: 0,
    focusMinutes: 0,
    focusSessionCount: 0
  }
})

const getAiAnalysis = async (req, res, next) => {
  try {
    if(!config.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing' })
    }

    const userId = req.userId
    const { start, end } = getTodayRange()

    const [allTasks, createdTodayTasks, completedTodayTasks, focusSessions, notes] = await Promise.all([
      Task.find({ userId }),
      Task.find({
        userId,
        _id: { $exists: true }
      }),
      Task.find({
        userId,
        completedAt: { $gte: start, $lte: end }
      }),
      FocusSession.find({
        startTime: { $gte: start, $lte: end }
      }),
      Note.find({})
    ])

    const taskIds = new Set(allTasks.map(task => task._id.toString()))
    const todayFocusSessions = focusSessions.filter(session => {
      const refId = session.source?.refId?.toString()
      return session.source?.type === 'independent' || taskIds.has(refId)
    })
    const taskNotes = notes.filter(note => {
      const refId = note.source?.refId?.toString()
      return taskIds.has(refId)
    })

    const createdToday = createdTodayTasks.filter(task => {
      const createdAt = task._id.getTimestamp()
      return createdAt >= start && createdAt <= end
    })

    const summaryData = {
      dateRange: {
        start,
        end
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        name: req.user.name
      },
      metrics: {
        totalTaskCount: allTasks.length,
        createdTodayTaskCount: createdToday.length,
        completedTodayTaskCount: completedTodayTasks.length,
        pendingTaskCount: allTasks.filter(task => task.status === 'pending').length,
        inProgressTaskCount: allTasks.filter(task => task.status === 'in_progress').length,
        archivedTaskCount: allTasks.filter(task => task.status === 'archived').length,
        totalFocusSecondsToday: todayFocusSessions.reduce((sum, session) => sum + session.duration, 0),
        totalFocusMinutesToday: Math.round(todayFocusSessions.reduce((sum, session) => sum + session.duration, 0) / 60),
        focusSessionCountToday: todayFocusSessions.length,
        noteCount: taskNotes.length
      },
      tasks: allTasks.map(task => ({
        id: task._id,
        title: task.title,
        priority: task.priority,
        status: task.status,
        tagText: task.tagText,
        completedAt: task.completedAt,
        createdAt: task._id.getTimestamp(),
        totalFocusedTime: task.totalFocusedTime
      })),
      focusSessions: todayFocusSessions.map(session => ({
        id: session._id,
        startTime: session.startTime,
        duration: session.duration,
        source: session.source
      })),
      notes: taskNotes.map(note => ({
        id: note._id,
        title: note.title,
        content: note.content,
        source: note.source
      }))
    }

    const hasNoTodayData =
      summaryData.metrics.createdTodayTaskCount === 0 &&
      summaryData.metrics.completedTodayTaskCount === 0 &&
      summaryData.metrics.totalFocusSecondsToday === 0 &&
      summaryData.metrics.noteCount === 0

    if(hasNoTodayData) {
      return res.status(200).json({
        analysis: createEmptyAnalysis(),
        sourceData: summaryData,
        raw: null
      })
    }

    const prompt = `
你是一個學習與專注助理。請根據以下資料分析使用者今天的狀態，輸出繁體中文 JSON，不要輸出 markdown。

JSON schema:
{
  "headline": "一句話總結",
  "summary": "今日整體分析",
  "wins": ["做得好的地方"],
  "risks": ["可能的問題"],
  "suggestions": ["接下來可執行建議"],
  "metrics": {
    "completedTaskCount": number,
    "createdTaskCount": number,
    "focusMinutes": number,
    "focusSessionCount": number
  }
}

資料:
${JSON.stringify(summaryData, null, 2)}
`

    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': config.GEMINI_API_KEY
      },
      body: JSON.stringify({
        model: 'gemini-3.6-flash',
        input: prompt
      })
    })

    if(!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      return res.status(502).json({
        error: 'Gemini API request failed',
        detail: errorText
      })
    }

    const geminiData = await geminiResponse.json()
    const text = geminiData.output_text || '{}'
    const analysis = extractJson(text)

    res.status(200).json({
      analysis,
      sourceData: summaryData,
      raw: geminiData
    })
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getAiAnalysis
}
