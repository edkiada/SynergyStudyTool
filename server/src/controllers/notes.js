const Note = require('../models/note')
const Task = require('../models/task')

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note
      .find({})
    res.json(notes)
  } catch(error) {
    next(error)
  }
}

const createNote = async (req, res, next) => {
  try {
    const body = req.body
    const note = new Note({
      title: body.title,
      content: body.content,
      source: body.source || { type: 'independent' } 
    })
    const savedNote = await note.save()
    if (savedNote.source.type !== 'independent' && savedNote.source.refId) {
      const task = await Task.findById(savedNote.source.refId)
      task.notes = task.notes.concat(savedNote._id)
      await task.save()
    }
    res.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
}

const updateNote = async (req, res, next) => {
  try {
    const note_id = req.params.id
    const { title, content } = req.body

    const updateNote = await Note.findByIdAndUpdate(
      note_id,
      { title, content },
      { new: true, runValidators: true }
    )

    if (!updateNote) {
      return res.status(404).json({ error: "not find note" })
    }
    res.json(updateNote)
  } catch(error) {
    next(error)
  }
} 

const deleteNote = async (req, res, next) => {
  try {
    const note_id = req.params.id
    const response = await Note.findById(note_id)   
    if (!response) {
      return res.status(404).json({
        status: 'error',
        message: '找不到筆記'
      })
    }
    if (response.source.type !== 'independent' && response.source.refId) {
      await Task.findByIdAndUpdate(
        response.source.refId,
        {
          $pull: {
            notes: note_id
          }
        }
      )
    } 
    await Note.findByIdAndDelete(note_id)
    res.status(204).end()
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
}