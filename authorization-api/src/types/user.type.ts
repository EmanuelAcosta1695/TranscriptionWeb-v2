export type User = {
  email: string
  firstName: string | null
  lastName: string | null
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export type LoginResponse = {
  token: string
  user: string
}
