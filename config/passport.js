const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',  // Change argument from default value
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // Check if email has been registered
          if (!user) {
            return done(null, false, { message: 'That email is not registered!' })
          }

          // If Email is not yet registered, check password
          return bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              // Password not matched
              if (!isMatch) {
                return done(null, false, { message: 'Password incorrect.' })
              }
              // Password matched
              return done(null, user)
            })
        })
        .catch(err => done(err))
    }
  ))

  // Serialize and deserialize
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
