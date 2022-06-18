// Import modules
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')

// Import seeds data
const seedRestaurants = require('./restaurants.json').seeds
const seedUsers = require('./users.json').seeds

db.once('open', () => {
  console.log('Start create seeds......')
  return Promise.all(
    seedUsers.map(seedUser => {
      // Check if seed users existed
      return User.findOne({ email: seedUser.email })
        .then(result => {
          // If seed exists, stop seeder
          if (result) return console.log(`${seedUser.name} already existed`)
          // If not exists, continue
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(seedUser.password, salt))
            .then(hash => User.create({
              name: seedUser.name,
              email: seedUser.email,
              password: hash
            }))
            .then(user => {
              user = user.toObject()
              const list = seedRestaurants.filter(item => seedUser.restaurantsList.includes(item.id))
              return Promise.all(list.map(item => {
                item.userId = user._id
                return Restaurant.create(item)
              }))
            })
        })
    })
  ).then(() => {
    console.log('Done!')
    process.exit()
  })
    .catch(err => console.log(err))
})
