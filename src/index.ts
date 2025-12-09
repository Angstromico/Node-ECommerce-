import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const router = express.Router()

const PORT = process.env.PORT || 3000
const API = process.env.API || '/api/v1'

router.get('/', (_, res) => {
  res.send('Hello World!')
})

router.get('/users', (_, res) => {
  res.json([{ id: 1, name: 'Alice' }])
})

app.use(API, router)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
