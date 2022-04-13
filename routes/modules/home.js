const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Read: show all restaurants
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Read: show search results
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }

  const keywords = req.query.keyword.toLowerCase().trim().split(',')

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      const searchResults = restaurantData.filter((item) => {
        const searchRange = (item.name + item.name_en + item.category + item.location).toLowerCase().trim()
        return keywords.every(keyword => searchRange.includes(keyword))
      })
      res.render('index', { restaurants: searchResults, keywords })
    })
    .catch(error => console.log(error))
})

module.exports = router
