const router = require('express').Router()
const sessionController = require('../controllers/focusSessions')

router.post('/', sessionController.createFocusSession)
router.get('/', sessionController.getAllFocusSessions)
router.get('/calendar', sessionController.getCalendarFocusSessions)
router.delete('/:id', sessionController.deleteFocusSession)
module.exports = router