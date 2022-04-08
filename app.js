// Import modules and data & set related variables
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const Restarant = require('./models/restaurant.js')

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

// Routes settings
// Create: add new restaurant info
app.post('/restaurants', (req, res) => {
  Restarant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read: Show add page of new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('add_new')
})
// Read: show all restaurants
app.get('/', (req, res) => {
  Restarant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Read: show detail info of target restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restarant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// show search results
app.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim().split(',')
  const searchResults = list.results.filter((item) => {
    const searchRange = (item.name + item.name_en + item.category + item.location).toLowerCase().trim()
    return keywords.every(keyword => searchRange.includes(keyword))
  })

  res.render('index', { restaurants: searchResults, keywords })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
