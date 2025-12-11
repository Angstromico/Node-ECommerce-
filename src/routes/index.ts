import { Router } from 'express'
import productRoutes from '@/routes/productRoutes.js'
import categoryRoutes from '@/routes/categoryRoutes.js'
import orderitemsRoutes from '@/routes/orderitemsRoutes.js'
import orderRoutes from '@/routes/orderRoutes.js'
import userRoutes from '@/routes/userRoutes.js'

const router = Router()

router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/orderitems', orderitemsRoutes)
router.use('/orders', orderRoutes)
router.use('/users', userRoutes)

export default router
