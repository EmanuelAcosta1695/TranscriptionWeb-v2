import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT

export const mailtrapClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
})

const emailSender = process.env.EMAIL_SENDER
const emailSenderName = process.env.EMAIL_SENDER_NAME

if (!emailSender || !emailSenderName) {
  throw new Error(
    'Email sender environment variables are not defined. Please set EMAIL_SENDER and EMAIL_SENDER_NAME.'
  )
}

export const sender = {
  email: emailSender,
  name: emailSenderName,
}
