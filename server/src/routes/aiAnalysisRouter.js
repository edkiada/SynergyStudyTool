const router = require('express').Router()
const aiAnalysisController = require('../controllers/aiAnalysis')
const middleware = require('../middleware')

router.get('/', middleware.userExtractor, middleware.aiAnalysisLimiter, aiAnalysisController.getAiAnalysis)

module.exports = router
