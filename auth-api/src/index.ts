import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.ts'
import authRoutes from './routes/auth.route.ts'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.ORIGIN, credentials: true }))

app.use(express.json())

app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received ${req.method} request for ${req.url}`)
  next()
})

app.get('/', (req: Request, res: Response) => {
  console.log(`The server is running...`)
  res.status(200).send('Welcome to the Auth-API!')
})

// Start the server
app.listen(PORT, () => {
  connectDB()
  console.log('Server is running on port:', PORT)
  console.log('API is available at: http://localhost:' + PORT + '/')
  console.log('Listening for incoming requests...')
})
