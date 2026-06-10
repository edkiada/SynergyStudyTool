const router = require('express').Router()
const sessionController = require('../controllers/focusSessions')

router.post('/', sessionController.createFocusSession)

module.exports = router