 //whitout this model mongoDB does not know what to store in the database

 import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true },
    sku:           { type: String, required: true, unique: true },
    price:         { type: Number, required: true },
   

    badge:  { type: String, default: null },  // "Meilleure vente" or null
    image:  { type: String, required: true }, // main image
    images: [String],                         // extra angles
    description:    { type: String, default: '' },
    details:        { type: String, default: '' },
    returnPolicy:   { type: String, default: '' },
    shippingPolicy: { type: String, default: '' },

    inStock:  { type: Boolean, default: true },
    category: { type: String, default: 'sacs' },
  },
  { timestamps: true }
)


export default mongoose.model('Product', productSchema)