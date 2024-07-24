import { check } from 'express-validator'

export const userValidationRules = [
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('currentPassword')
    .isLength({ min: 8, max: 50 })
    .optional()
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

export const getUserByIdValidationRules = [
  check('id').isUUID().withMessage('Enter a valid ID.'),
]

export const updateValidationRules = [
  check('email')
    .isEmail()
    .optional()
    .withMessage('Enter a valid email address'),
  check('currentPassword')
    .isLength({ min: 8, max: 50 })
    .optional()
    .withMessage('Password must be at least 8 characters long'),
  check('newPassword')
    .optional()
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long'),
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
