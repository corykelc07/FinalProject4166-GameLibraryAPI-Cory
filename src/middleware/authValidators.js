import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignup = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),

    handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

    handleValidationErrors,
];