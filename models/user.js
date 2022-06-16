// Connect to database
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Set schema of restaurant
const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

// Export module named 'Restarant'
module.exports = mongoose.model('User', userSchema)
