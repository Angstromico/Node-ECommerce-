import express from 'express'
import {
  getOrderItems,
  createOrderItem,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from '@/controllers/orderitemsController.js'

const router = express.Router()

router.get('/', getOrderItems)
router.post('/', createOrderItem)
router.get('/:id', getOrderItem)
router.put('/:id', updateOrderItem)
router.delete('/:id', deleteOrderItem)

export default router
