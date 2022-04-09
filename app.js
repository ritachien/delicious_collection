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
  res.render('edit', { layout: 'info' })
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

// Read: show search results
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }

  const keywords = req.query.keyword.toLowerCase().trim().split(',')

  Restarant.find()
    .lean()
    .then(restaurantData => {
      const searchResults = restaurantData.filter((item) => {
        const searchRange = (item.name + item.name_en + item.category + item.location).toLowerCase().trim()
        return keywords.every(keyword => searchRange.includes(keyword))
      })
      res.render('index', { restaurants: searchResults, keywords })
    })
    .catch(error => console.log(error))
})

// Read: Show edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restarant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, layout: 'info' }))
    .catch(error => console.log(error))
})

// Update: renew data from edit page
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restarant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restarant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
