import { body, param, oneOf } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateReviewCreate = [
    body('title')
        .exists({ values: "falsy" })
        .withMessage("Title is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 10 })
        .withMessage("Title must be at least 10 characters"),
    body('content')
        .exists({ values: "falsy" })
        .withMessage("Content is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 20 })
        .withMessage("Content must be at least 20 characters"),
    body('rating')
        .exists({ values: "falsy" })
        .withMessage("Rating is required")
        .bail()
        .isInt({ min: 1, max: 10 })
        .withMessage("Rating must be an integer between 1 and 10"),
    body('gameId')
        .exists({ values: "falsy" })
        .withMessage("Game ID is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Game ID must be a positive integer"),
    handleValidationErrors,
]

export const validateReviewUpdate = [
    oneOf(
        [
            body('title').exists({ values: "falsy" }),
            body('content').exists({ values: "falsy" }),
            body('rating').exists({ values: "falsy" }),
        ],
         { message: "At least one field (title, content, rating) must be provided" }
    ),
    
    body('title')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 10 })
        .withMessage("Title must be at least 10 characters"),
    body('content')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 20 })
        .withMessage("Content must be at least 20 characters"),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage("Rating must be an integer between 1 and 10"),
    handleValidationErrors,
]

export const validateReviewId = [
    param("id")
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Id must be a positive integer"),
    handleValidationErrors,
]

