import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

dotenv.config()

const app = express()
const router = express.Router()

const PORT = process.env.PORT || 3000
const API = process.env.API || '/api/v1'

app.use(express.json())

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  countInStock: { type: Number, required: true, min: 0 },
})

const Product = mongoose.model('Product', productSchema)

router.get('/', (_, res) => {
  res.send('Hello World!')
})

router.get('/products', async (_, res) => {
  const products = await Product.find()

  if (products) return res.status(OK).json(products)

  return res.status(NOT_FOUND).json({ message: 'Error fetching products' })
})

router.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  })

  const productNew = await product.save()

  if (productNew)
    return res
      .status(CREATED)
      .json({ message: 'Product created successfully', product, success: true })

  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ message: 'Error creating product', success: false })
})

app.use(API, router)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
