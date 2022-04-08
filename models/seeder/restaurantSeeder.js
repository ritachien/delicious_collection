// Import modules and data
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restarantsData = require('../../restaurant').results


// Connect to database and set listener
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connect error!')
})

db.once('open', () => {
  console.log(`MongoDB connected! \nCreating seeds......`)
  Restaurant.create(restarantsData)
    .then(() => console.log('Done!'))
})