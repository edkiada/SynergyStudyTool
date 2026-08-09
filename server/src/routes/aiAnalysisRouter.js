const router = require('express').Router()
const aiAnalysisController = require('../controllers/aiAnalysis')
const middleware = require('../middleware')

router.get('/', middleware.userExtractor, aiAnalysisController.getAiAnalysis)

module.exports = router
