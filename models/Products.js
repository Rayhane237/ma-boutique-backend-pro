 //whitout this model mongoDB does not know what to store in the database

 const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  sku: { type: String },
  category: { type: String },
  badge: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)