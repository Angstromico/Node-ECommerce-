import express, { Router } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()
const router = Router()

const PORT = process.env.PORT || 3000
const API = process.env.API || '/api/v1'

app.use(express.json())

router.get('/', (_, res) => {
  res.send('Hello World!')
})

router.use('/products', productRoutes)

app.use(API, router)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
