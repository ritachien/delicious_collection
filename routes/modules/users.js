const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { layout: 'info' })
})

router.get('/register', (req, res) => {
  res.render('register', { layout: 'info' })
})

module.exports = router
