import { Request, Response } from 'express'
import OrderItem from '@/models/Orderitems.js'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

export const getOrderItems = async (_: Request, res: Response): Promise<Response> => {
  try {
    const orderItems = await OrderItem.find()
    if (orderItems) return res.status(OK).json(orderItems)
    return res.status(NOT_FOUND).json({ message: 'Error fetching order items' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching order items', error })
  }
}

export const createOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderItem = new OrderItem(req.body)
    const orderItemNew = await orderItem.save()
    if (orderItemNew)
      return res
        .status(CREATED)
        .json({ message: 'Order item created successfully', orderItem, success: true })
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating order item', success: false })
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating order item', success: false, error })
  }
}

export const getOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderItem = await OrderItem.findById(req.params.id)
    if (orderItem) return res.status(OK).json(orderItem)
    return res.status(NOT_FOUND).json({ message: 'Error fetching order item' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching order item', error })
  }
}

export const updateOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (orderItem) return res.status(OK).json(orderItem)
    return res.status(NOT_FOUND).json({ message: 'Error updating order item' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error updating order item', error })
  }
}

export const deleteOrderItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id)
    if (orderItem) return res.status(OK).json(orderItem)
    return res.status(NOT_FOUND).json({ message: 'Error deleting order item' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error deleting order item', error })
  }
}
