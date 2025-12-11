import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  countInStock: { type: Number, required: true, min: 0 },
  brand: { type: String, required: false },
  price: { type: Number, required: false },
  rating: { type: Number, required: false },
  numReviews: { type: Number, required: false },
  description: { type: String, required: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
})

const Product = mongoose.model('Product', productSchema)

export default Product
