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

app.get('/restaurants/:id', (req, res) => {
  const restaurant = list.results.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const searchResults = list.results.filter(item => {
    const strings = item.name + item.category
    return strings.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: searchResults, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
