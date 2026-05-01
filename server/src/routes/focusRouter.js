const router = require('express').Router()
const SessionController = require('../controllers/focusSessions')

router.post('/', SessionController.createFocusSession)

module.exports = router