const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// Routes for login
router.get('/login', (req, res) => {
  res.render('login', { layout: 'form' })
})

// Routes for register
router.get('/register', (req, res) => {
  res.render('register', { layout: 'form' })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Check if email has already registered
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          layout: 'form'
        })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router
