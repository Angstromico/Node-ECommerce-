import { Request, Response } from 'express'
import User from '@/models/User.js'
import { OK, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@/utils/HTTP-Codes.js'

export const getUsers = async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find()
    if (users) return res.status(OK).json(users)
    return res.status(NOT_FOUND).json({ message: 'Error fetching users' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching users', error })
  }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = new User(req.body)
    const userNew = await user.save()
    if (userNew)
      return res.status(CREATED).json({ message: 'User created successfully', user, success: true })
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating user', success: false })
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating user', success: false, error })
  }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id)
    if (user) return res.status(OK).json(user)
    return res.status(NOT_FOUND).json({ message: 'Error fetching user' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user', error })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (user) return res.status(OK).json(user)
    return res.status(NOT_FOUND).json({ message: 'Error updating user' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error updating user', error })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) return res.status(OK).json(user)
    return res.status(NOT_FOUND).json({ message: 'Error deleting user' })
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user', error })
  }
}
