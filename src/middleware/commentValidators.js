import { body, param} from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateCommentCreate = [
    body('content')
        .exists({ values: "falsy" })
        .withMessage("Content is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Content must be at least 5 characters"),
    body('reviewId')
        .exists({ values: "falsy" })
        .withMessage("Review ID is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Review ID must be a positive integer"),
    handleValidationErrors,
]

export const validateCommentUpdate = [
    body('content')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Content must be at least 5 characters"),
    handleValidationErrors,
]

export const validateCommentId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Comment ID must be a positive integer'),
    handleValidationErrors,
];

