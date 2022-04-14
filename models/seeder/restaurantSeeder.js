// Import modules and data
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantsData = require('../../restaurant.json').results

db.once('open', () => {
  console.log('Creating seeds......')
  Restaurant.create(restaurantsData)
    .then(() => {
      console.log('Done!')
      db.close()
    })
    .catch(error => console.log(error))
})
