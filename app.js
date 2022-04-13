// Import modules and data & set related variables
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

// Connect to database and set event listener
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connecting error!')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})


// Set express engine
app.engine('handlebars', exphbs.engine()) // defaultLayout: main
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
