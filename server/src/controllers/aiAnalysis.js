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

// 防禦型 JSON 解析函式
const extractJson = (input) => {
  // 1. 若已經是物件，直接回傳
  if (typeof input === 'object' && input !== null) {
    return input
  }

  // 2. 安全轉型為字串，防止 undefined/null 呼叫 .replace 崩潰
  const text = typeof input === 'string' ? input : String(input || '')

  try {
    return JSON.parse(text)
  } catch (error) {
    const cleanText = text.replace(/```json|```/g, '').trim()
    const match = cleanText.match(/\{[\s\S]*\}/)
    if (match) {
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
    if (!config.CLOUDFLARE_ACCOUNT_ID || !config.CLOUDFLARE_API_TOKEN) {
      return res.status(500).json({ error: 'Cloudflare credentials are missing in env' })
    }

    const userId = req.userId
    const { start, end } = getTodayRange()

    const [allTasks, completedTodayTasks, focusSessions, notes] = await Promise.all([
      Task.find({ userId }),
      Task.find({ userId, completedAt: { $gte: start, $lte: end } }),
      FocusSession.find({ userId, startTime: { $gte: start, $lte: end } }),
      Note.find({ userId })
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

    const createdToday = allTasks.filter(task => {
      const createdAt = task._id.getTimestamp()
      return createdAt >= start && createdAt <= end
    })

    const todayActiveTasks = allTasks.filter(task => {
      const createdAt = task._id.getTimestamp()
      const isCreatedToday = createdAt >= start && createdAt <= end
      const isCompletedToday = task.completedAt && task.completedAt >= start && task.completedAt <= end
      const isInProgress = task.status === 'in_progress'
      return isCreatedToday || isCompletedToday || isInProgress
    })

    const sampledTasks = todayActiveTasks
      .sort((a, b) => (b.priority === 'high' ? 1 : -1))
      .slice(0, 20)
      .map(t => ({
        title: (t.title || '').slice(0, 100), // 單條標題硬截斷至100字
        priority: t.priority,
        status: t.status
      }))
    
    const summaryData = {
      metrics: {
        totalTaskCount: allTasks.length,
        createdTodayTaskCount: createdToday.length,
        completedTodayTaskCount: completedTodayTasks.length,
        pendingTaskCount: allTasks.filter(task => task.status === 'pending').length,
        inProgressTaskCount: allTasks.filter(task => task.status === 'in_progress').length,
        totalFocusMinutesToday: Math.round(todayFocusSessions.reduce((sum, session) => sum + (session.duration || 0), 0) / 60),
        focusSessionCountToday: todayFocusSessions.length,
        noteCount: taskNotes.length
      },
      sampledTasks,
      todayFocusSessions: todayFocusSessions.map(session => ({
        durationMinutes: Math.round((session.duration || 0) / 60)
      }))
    }

    const hasNoTodayData =
      summaryData.metrics.createdTodayTaskCount === 0 &&
      summaryData.metrics.completedTodayTaskCount === 0 &&
      summaryData.metrics.totalFocusMinutesToday === 0 &&
      summaryData.metrics.noteCount === 0

    if (hasNoTodayData) {
      return res.status(200).json({
        analysis: createEmptyAnalysis(),
        sourceData: summaryData,
        raw: null
      })
    }

    const prompt = `
你是一個學習與專注助理。請根據以下資料分析使用者今天的狀態，輸出繁體中文 JSON，不要輸出任何 markdown 或其他額外文字。

【分析規則】
1. 輸出的 JSON 中，metrics 物件內的數值必須嚴格對應輸入資料的 "metrics" 欄位（全量統計），請勿以抽樣清單的長度計算。
2. "todayTasks" 為今日最具代表性的重點任務抽樣，請根據這些任務的語意與優先級產出 wins, risks 與 suggestions。

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

    const modelName = '@cf/meta/llama-3.1-8b-instruct'
    const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${config.CLOUDFLARE_ACCOUNT_ID}/ai/run/${modelName}`

    const cfResponse = await fetch(cfUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs only valid JSON.' },
          { role: 'user', content: prompt }
        ]
      })
    })

    if (!cfResponse.ok) {
      const errorText = await cfResponse.text()
      console.error('[Cloudflare AI Error]', errorText)
      return res.status(502).json({ error: 'Cloudflare Workers AI request failed', detail: errorText })
    }

    const cfData = await cfResponse.json()
    
    // 安全提取 response 欄位，確保為非 null/undefined 的型別
    const rawText = cfData.result?.response ?? '{}'
    const analysis = extractJson(rawText)

    return res.status(200).json({
      analysis,
      sourceData: summaryData,
      raw: cfData
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAiAnalysis
}