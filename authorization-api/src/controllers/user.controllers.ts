import { Request, Response } from 'express'
import { registerNewUser, loginUser } from '../services/user.service'
import { validationResult } from 'express-validator'

export const create = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await registerNewUser(req, res)
  } catch (error) {
    res.status(500).json({ error: true, message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await loginUser(req, res)
  } catch (error) {
    res.status(500).json({ error: true, message: 'Internal server error' })
  }
}
