const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

// Routes for login ========================================
router.get('/login', (req, res) => {
  res.render('login', { layout: 'form' })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// Routes for logout =======================================
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
    res.redirect('/users/login')
  })
})

// Routes for register =====================================
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
