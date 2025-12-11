import { Request, Response } from 'express'
import Order from '@/models/Order.js'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

export const getOrders = async (_: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.find()
    if (orders) return res.status(OK).json(orders)
    return res.status(NOT_FOUND).json({ message: 'Error fetching orders' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching orders', error })
  }
}

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = new Order(req.body)
    const orderNew = await order.save()
    if (orderNew)
      return res
        .status(CREATED)
        .json({ message: 'Order created successfully', order, success: true })
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating order', success: false })
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating order', success: false, error })
  }
}

export const getOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) return res.status(OK).json(order)
    return res.status(NOT_FOUND).json({ message: 'Error fetching order' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching order', error })
  }
}

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (order) return res.status(OK).json(order)
    return res.status(NOT_FOUND).json({ message: 'Error updating order' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error updating order', error })
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (order) return res.status(OK).json(order)
    return res.status(NOT_FOUND).json({ message: 'Error deleting order' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error deleting order', error })
  }
}
