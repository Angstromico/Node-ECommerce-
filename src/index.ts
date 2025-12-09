import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const router = express.Router()

const PORT = process.env.PORT || 3000
const API = process.env.API || '/api/v1'

app.use(express.json())

router.get('/', (_, res) => {
  res.send('Hello World!')
})

router.get('/products', (_, res) => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]

  res.json(products)
})

router.post('/products', (req, res) => {
  const product = req?.body?.product

  res.status(201).json({ message: 'Product created successfully', product })
})

app.use(API, router)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
