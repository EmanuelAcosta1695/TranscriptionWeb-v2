import { check } from 'express-validator'

export const userValidationRules = [
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 8 characters long'),
]

export const registerValidationRules = [
  ...userValidationRules,
  check('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string'),
  check('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string'),
  check('isAdmin')
    .optional()
    .isBoolean()
    .withMessage('isAdmin must be a boolean'),
]
