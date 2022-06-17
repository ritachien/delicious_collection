const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant')

// Create: add new restaurant info
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  Restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read: Show add page of new restaurant
router.get('/new', (req, res) => {
  res.render('edit', { layout: 'form' })
})

// Delete warning page
router.get('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('delete', { restaurant, layout: 'form' }))
    .catch(error => console.log(error))
})

// Read: Show edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, layout: 'form' }))
    .catch(error => console.log(error))
})

// Read: show detail info of target restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// Update: renew data from edit page
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurants.findOneAndUpdate({ _id, userId }, { name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// Delete: delete selected restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurants.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
