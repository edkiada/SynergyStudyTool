const router = require('express').Router()
const notesControllers = require('../controllers/notes')

router.get('/', notesControllers.getAllNotes)
router.post('/', notesControllers.createNote)
router.put('/:id', notesControllers.updateNote)
router.delete('/:id', notesControllers.deleteNote)

module.exports = router

