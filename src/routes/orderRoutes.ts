import {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} from '@/controllers/orderController.js'
import { Router } from 'express'

const router = Router()

router.get('/', getOrders)
router.post('/', createOrder)
router.get('/:id', getOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router
