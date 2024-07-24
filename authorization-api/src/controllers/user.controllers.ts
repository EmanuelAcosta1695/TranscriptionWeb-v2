import { Request, Response } from 'express'
import {
  registerNewUser,
  loginUser,
  getUserDataById,
  updateUserDataById,
  deleteUserDataById,
} from '../services/user.service'
import { handleRequest } from '../middleware/requestHandler'

export const create = (req: Request, res: Response) =>
  handleRequest(req, res, registerNewUser)

export const login = (req: Request, res: Response) =>
  handleRequest(req, res, loginUser)

export const getUserById = (req: Request, res: Response) =>
  handleRequest(req, res, getUserDataById)

export const updateUserById = (req: Request, res: Response) =>
  handleRequest(req, res, updateUserDataById)

export const deleteUserById = (req: Request, res: Response) =>
  handleRequest(req, res, deleteUserDataById)
