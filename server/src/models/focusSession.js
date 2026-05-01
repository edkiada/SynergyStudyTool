const mongoose = require('mongoose')

const focusSchema = new mongoose.Schema({
  stringTime: {
    type: Date,
  },
  duration: {
    type: Number,
    required: true,
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

focusSchema.set('toJSON', {
  transform: (doc, rtn) => {
    rtn.id = rtn._id.toString()
    delete rtn._id
    delete rtn.__v
  }
})

module.exports = mongoose.model('Focus', focusSchema)