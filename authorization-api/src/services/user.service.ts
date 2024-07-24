import { Request, Response } from 'express'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { db } from '../utils/db.server'
import { LoginResponse, User } from '../types/user.type'
import { generateToken } from '../utils/jwt.handle'

export const registerNewUser = async (req: Request): Promise<User> => {
  try {
    const { email, currentPassword, firstName, lastName, isAdmin } = req.body

    // Verificar si el usuario ya existe
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('Invalid user.')
    }

    // Encriptar la contraseña
    const passwordHash = await encrypt(currentPassword)

    // Crear el nuevo usuario y seleccionar los campos deseados
    return db.user.create({
      data: { email, password: passwordHash, firstName, lastName, isAdmin },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error registering user: ', error)
    throw new Error('Error registering user.')
  }
}

export const loginUser = async (req: Request): Promise<LoginResponse> => {
  try {
    const { email, currentPassword } = req.body

    const checkIs = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!checkIs) {
      throw new Error('Invalid credentials')
    }

    const passwordHash = checkIs.password
    const isCorrect = await verified(currentPassword, passwordHash)

    if (!isCorrect) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken(checkIs.email)
    const data = {
      token,
      user: checkIs.email,
    }

    return data
  } catch (error) {
    console.error('Error authenticating user: ', error)
    throw new Error('Error authenticating user.')
  }
}

export const getUserDataById = async (req: Request): Promise<User> => {
  try {
    const { id } = req.body

    const userData = await db.user.findFirst({
      where: {
        id,
      },
    })

    if (!userData) {
      throw new Error('Invalid user')
    }

    return userData
  } catch (error) {
    console.error('Error getting user data: ', error)
    throw new Error('Error getting user data.')
  }
}

export const updateUserDataById = async (req: Request): Promise<User> => {
  try {
    const {
      id,
      email,
      currentPassword,
      newPassword,
      firstName,
      lastName,
      isAdmin,
    } = req.body

    const user = await db.user.findUnique({ where: { id } })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await verified(currentPassword, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const updateData: { [key: string]: any } = {
      email,
      firstName,
      lastName,
      isAdmin,
    }

    if (newPassword) {
      updateData.password = await encrypt(newPassword)
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return updatedUser
  } catch (error) {
    console.error('Error updating user data:', error)
    throw new Error('Error updating user data')
  }
}

export const deleteUserDataById = async (req: Request): Promise<void> => {
  try {
    const { id } = req.body

    await db.user.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw new Error('Error deleting user data')
  }
}
