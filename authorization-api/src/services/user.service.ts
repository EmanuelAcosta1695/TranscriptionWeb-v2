import { Request, Response } from 'express'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { db } from '../utils/db.server'
import { User } from '../types/user.type'
import { generateToken } from '../utils/jwt.handle'

export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<User | void> => {
  try {
    const { email, password, firstName, lastName, isAdmin } = req.body

    // Verificar si el usuario ya existe
    const checkIs = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (checkIs) {
      res.status(400).json({ error: true, message: 'Invalid user' })
      return
    }

    // Encriptar la contraseña
    const passHash = await encrypt(password)

    // Crear el nuevo usuario y seleccionar los campos deseados
    const newUser = await db.user.create({
      data: {
        email,
        password: passHash,
        firstName,
        lastName,
        isAdmin,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        createdAt: true,
      },
    })

    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error registering new user:', error)
    res.status(500).json({ message: 'ERROR_CREATING_USER' })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const checkIs = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!checkIs) {
      res.status(400).json({ error: true, message: 'Invalid credentials' })
      return
    }

    const passwordHash = checkIs.password
    const isCorrect = await verified(password, passwordHash)

    if (!isCorrect) {
      res.status(400).json({ error: true, message: 'Invalid credentials' })
      return
    }

    const token = generateToken(checkIs.email)
    const data = {
      token,
      user: checkIs.email,
    }

    res
      .status(200)
      .json({ error: false, message: 'Login successful', data: data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: true, message: 'Internal server error' })
  }
}
