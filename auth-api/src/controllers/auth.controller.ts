import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { User } from '../models/user.model.ts'
import { generateVerificationCode } from '../utils/generateVerificationCode.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sentResetSuccessEmail,
} from '../mailtrap/emails.js'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/verifyToken.ts'

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  try {
    if (!email || !password || !name) {
      throw new Error('All fields are required')
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      res.status(400).json({ success: false, message: 'user already exists' })
      return
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const verificationToken = generateVerificationCode()
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    })

    await user.save()

    generateTokenAndSetCookie(res, user._id)

    await sendVerificationEmail({
      email: user.email,
      verificationToken,
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { ...user.toObject(), password: undefined },
    })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body

  try {
    const user = await User.findOne({
      verificationToken: code,
      // verify that the token is not expired
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      })
      return
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save()

    await sendWelcomeEmail({ email: user.email, name: user.name })

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        ...user.toObject(),
        password: undefined,
      },
    })
  } catch (error) {
    console.log('error in verifyEmail ', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' })
      return
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: 'Invalid credentials' })
      return
    }

    generateTokenAndSetCookie(res, user._id)

    user.lastLogin = new Date()

    res.status(200).json({
      success: true,
      messsage: 'Logged in successfully',
      user: {
        ...user.toObject(),
        password: undefined,
      },
    })
  } catch (error: any) {
    console.log('error in login ', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token')
  res.status(200).json({ success: true, message: 'Logged out successfully' })
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(400).json({ success: false, message: 'user not found' })
      return
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt

    await user.save()

    // send email
    await sendPasswordResetEmail({
      email: user.email,
      resetURL: `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    })

    res.status(200).json({
      success: true,
      messsage: 'Password reset link sent to your email',
    })
  } catch (error: any) {
    console.log('Error in forgotPassword ', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: 'Invalid or expired reset token' })
      return
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()

    await sentResetSuccessEmail({ email: user.email })

    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' })
  } catch (error: any) {
    console.log('Error resetting password successfully.', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const checkAuth = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    if (!user) {
      res.status(400).json({ success: false, message: 'User not found' })
      return
    }

    res.status(200).json({ success: true, user })
  } catch (error: any) {
    console.log('Error in checkAuth', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
