import { validationResult } from 'express-validator'
import { Request, Response } from 'express'

// Handler to validate request and invoke service functions
export const handleRequest = async (
  req: Request,
  res: Response,
  serviceFunction: (body: any) => Promise<any>
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const result = await serviceFunction(req.body)
    res.status(result.status || 200).json(result.response || result)
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ error: true, message: error.message || 'Internal server error' })
  }
}
