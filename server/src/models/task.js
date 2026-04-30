const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'hard'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'archived'],
    default: 'pending'
  },
  totalFocusedTime: {
    type: Number,
    default: 0, // 單位：秒
    min: [0, '專注時間不可為負數']
  },
  completedAt: {
    type: Date,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

taskSchema.pre('save', async function() {
  if(this.isModified('status')) {
    if(this.status === 'completed') {
      this.completedAt = Date.now()
    } else {
      this.completedAt = null;
    }
  }
})

module.exports = mongoose.model('Task', taskSchema)