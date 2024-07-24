import express from 'express'
import {
  create,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controllers'
import {
  getUserByIdValidationRules,
  registerValidationRules,
  updateValidationRules,
  userValidationRules,
} from '../utils/validations'
import { authentification } from '../middleware/authentification'

export const userRouter = express.Router()

userRouter.post('/signin', registerValidationRules, create)

userRouter.post('/login', userValidationRules, login)

userRouter.get('/getUserById', getUserByIdValidationRules, getUserById)

userRouter.put(
  '/updateUserById',
  authentification,
  updateValidationRules,
  updateUserById
)

userRouter.delete(
  '/updateUserById',
  authentification,
  getUserByIdValidationRules,
  deleteUserById
)
