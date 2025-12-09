import { Request, Response } from 'express'
import Product from '../models/Product.js'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

export const getProducts = async (_: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find()

    if (products) return res.status(OK).json(products)

    return res.status(NOT_FOUND).json({ message: 'Error fetching products' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching products', error })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock,
    })

    const productNew = await product.save()

    if (productNew)
      return res
        .status(CREATED)
        .json({ message: 'Product created successfully', product, success: true })

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating product', success: false })
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating product', success: false, error })
  }
}
