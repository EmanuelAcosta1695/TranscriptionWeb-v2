import { sign, verify } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

const generateToken = (id: string): string => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: '1d',
  })
  return jwt
}

const verifyToken = (token: string): any => {
  const isOk = verify(token, JWT_SECRET)
  return isOk
}

export { generateToken, verifyToken }
