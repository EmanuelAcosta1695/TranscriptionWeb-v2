import express from 'express'
import { create, login } from '../controllers/user.controllers'
import {
  registerValidationRules,
  userValidationRules,
} from '../utils/validations'

export const userRouter = express.Router()

userRouter.post('/signin', registerValidationRules, create)

userRouter.post('/login', userValidationRules, login)

// Router.get("/users", userControllers.findAll);
// Router.post("/signin", userControllers.create);
// Router.post("/login", userControllers.login);
// Router.get("/user/:id", userControllers.findById);
// Router.get("/user/:email", userControllers.findByEmail);
// Router.put("/user/:id", userControllers.update);
// Router.delete("/user/:id", userControllers.delete);
