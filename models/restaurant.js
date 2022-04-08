// Connect to database
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Set schema of restaurant
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: false },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }
})

// Export module named 'Restarant'
module.exports = mongoose.model('Restaurant', restaurantSchema)