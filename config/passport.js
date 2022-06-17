const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20').Strategy
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

  // Set Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_clientID,
    clientSecret: process.env.FACEBOOK_clientSecret,
    callbackURL: process.env.FACEBOOK_callbackURL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err))
      })
  }))

  // Set Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_clientID,
    clientSecret: process.env.GOOGLE_clientSecret,
    callbackURL: process.env.GOOGLE_callbackURL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err))
      })
  }
  ));

  // Serialize and deserialize
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
