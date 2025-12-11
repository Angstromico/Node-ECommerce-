import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/index.js'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
const API = process.env.API || '/api/v1'

app.use(express.json())
app.use(API, router)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
