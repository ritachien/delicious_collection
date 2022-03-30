// packages and variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const list = require('./restaurant.json')
const port = 3000

// Set express engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting static file
app.use(express.static('public'))

// Routes settings
app.get('/', (req, res) => {
  res.render('index', { restaurants: list.results })
})

// show detail info of target restaurant
app.get('/restaurants/:id', (req, res) => {
  const restaurant = list.results.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
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

function x(kws, range) {
  return kws.every(kw => range.includes(kw))
}