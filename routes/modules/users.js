const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

// Routes for login ========================================
router.get('/login', (req, res) => {
  res.render('login', { layout: 'form' })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// Routes for logout =======================================
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

// Routes for register =====================================
router.get('/register', (req, res) => {
  res.render('register', { layout: 'form' })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const register_error = []

  // Check form filling errors
  // Case: Some block remains blank
  if (!email || !password || !confirmPassword) {
    register_error.push({ message: 'Email、密碼及確認密碼欄位都是必填。' })
  }
  // Case: Password is different from confirmPassword
  if (password !== confirmPassword) {
    register_error.push({ message: '密碼與確認密碼不相符！' })
  }
  // If fit any cases above
  if (register_error.length) {
    return res.render('register', {
      layout: 'form',
      register_error,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // Check if email has already registered
  User.findOne({ email })
    .then(user => {
      // Case: If email is registered
      if (user) {
        register_error.push({ message: '這個 Email 已經註冊過了。' })
        res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          layout: 'form'
        })
      }

      // Case: Email is not yet registered
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// Routes for Account =====================================
router.get('/account/:id', (req, res) => {
  const user = req.user
  res.render('account', { user, layout: 'form' })
})

router.put('/account/:id', (req, res) => {
  const _id = req.params.id
  const { name, password, confirmPassword } = req.body
  const account_error = []
  // If no update to password
  if (password.length === 0) {
    return User.findByIdAndUpdate(_id, { name })
  }

  // Update password but different from confirmPassword
  if (password !== confirmPassword) {
    account_error.push({ message: '密碼和密碼確認不一致，請再試一次!' })
    return res.redirect(`/users/${_id}`)
  }

  // Update password
  if (passport.length && password === confirmPassword) {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.findByIdAndUpdate(_id, {
        name,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }
})

module.exports = router
