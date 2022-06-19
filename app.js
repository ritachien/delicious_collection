// Import modules and data & set related variables
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

// Set express engine
app.engine('handlebars', exphbs.engine()) // defaultLayout: main
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.login_error = req.flash('error')
  next()
})
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
