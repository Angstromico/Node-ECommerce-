import { Router } from 'express'
import productRoutes from '@/routes/productRoutes.js'

const router = Router()

router.use('/products', productRoutes)

export default router
