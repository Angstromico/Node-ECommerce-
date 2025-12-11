import { Request, Response } from 'express'
import Category from '@/models/Category.js'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.status(OK).json(categories)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body)
    res.status(CREATED).json(category)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error })
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(NOT_FOUND).json({ message: 'Category not found' })
    }
    res.status(OK).json(category)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!category) {
      return res.status(NOT_FOUND).json({ message: 'Category not found' })
    }
    res.status(OK).json(category)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(NOT_FOUND).json({ message: 'Category not found' })
    }
    res.status(OK).json(category)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error })
  }
}
