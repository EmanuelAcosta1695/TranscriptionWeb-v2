import { mailtrapClient, sender } from './mailtrap.config.js'
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplates.js'
import {
  BaseEmail,
  PasswordResetEmailArgs,
  VerificationEmailArgs,
  WelcomeEmailArgs,
} from '../types/email.type.js'

export const sendVerificationEmail = async (
  args: VerificationEmailArgs
): Promise<void> => {
  const { email, verificationToken } = args

  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender!,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification',
    })

    console.log('Email sent successfully: ', response)
  } catch (error) {
    console.log(`Error sending verification email: ${error}`)
    throw new Error(`Error sending verification email: ${error}`)
  }
}

export const sendWelcomeEmail = async (
  args: WelcomeEmailArgs
): Promise<void> => {
  const { email, name } = args

  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: '653d8e5e-ea11-4fdb-9b31-bcdfb67f9eed',
      template_variables: {
        company_info_name: 'Auth Company',
        name: name,
      },
    })

    console.log('Welcome email sent successfully', response)
  } catch (error) {
    console.error('Error sending welcome email: ', error)
    throw new Error(`Error sending welcome email: ${error}`)
  }
}

export const sendPasswordResetEmail = async (
  args: PasswordResetEmailArgs
): Promise<void> => {
  const { email, resetURL } = args

  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
    })

    console.log('Password reset email sent successfully', response)
  } catch (error) {
    console.error('Error sending password reset email: ', error)
    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export const sentResetSuccessEmail = async (args: BaseEmail): Promise<void> => {
  const { email } = args

  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    })

    console.log('Password reset email sent successfully', response)
  } catch (error) {
    console.error('Error sending password reset success email: ', error)
    throw new Error(`Error sending password reset success email: ${error}`)
  }
}
