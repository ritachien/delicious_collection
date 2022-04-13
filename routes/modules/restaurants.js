const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Create: add new restaurant info
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read: Show add page of new restaurant
router.get('/new', (req, res) => {
  res.render('edit', { layout: 'info' })
})

// Read: show detail info of target restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// Read: Show edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, layout: 'info' }))
    .catch(error => console.log(error))
})

// Update: renew data from edit page
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete: delete selected restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
