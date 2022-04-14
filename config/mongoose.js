require('dotenv').config({ path: 'config/.env' })  // path related to pwd
const mongoose = require('mongoose')

// Connect to database and set event listener
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connecting error!')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db
