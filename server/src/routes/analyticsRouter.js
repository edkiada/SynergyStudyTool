const router = require('express').Router()
const analyticsController = require('../controllers/analytics')

router.get('/', analyticsController.getAnalytics)

module.exports = router