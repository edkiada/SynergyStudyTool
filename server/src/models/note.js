const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  source: {
    type: {
      type: String,
      enum: ['task', 'independent'],
      default: 'independent'
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'source.onModel'
    },
    onModel: {
      type: String,
      enum: ['Task']         
    }
  }
})

noteSchema.set('toJSON', {
  transform: (doc, rtn) => {
    rtn.id = rtn._id.toString()
    delete rtn._id
    delete rtn.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)