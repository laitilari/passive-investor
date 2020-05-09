const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A test must have a name'],
    unique: [true, 'The name must be unique'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A test must have a price'],
  },
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test
