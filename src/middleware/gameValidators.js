import { param, body, oneOf, query } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateGameCreate = [
    body("title")
        .exists({ values: "falsy" })
        .withMessage("Title is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters"),
    body("genre")
        .exists({ values: "falsy" })
        .withMessage("Genre is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3})
        .withMessage("Genre must be at least 3 characters"),
    body("releaseDate")
        .exists({ values: "falsy" })
        .withMessage("ReleaseDate is required")
        .bail()
        .isISO8601()
        .withMessage("ReleaseDate must be a valid date"),
    body("developer")
        .exists({ values: "falsy" })
        .withMessage("Developer is required")
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Developer must be at least 3 characters"),
    handleValidationErrors,
]

export const validateGameUpdate = [
    oneOf(
        [
            body("title").exists({ values: "falsy" }),
            body("genre").exists({ values: "falsy" }),
            body("releaseDate").exists({ values: "falsy" }),
            body("developer").exists({ values: "falsy" }),
        ],
        { message: "At least one field (title, genre, releaseDate, developer) must be provided" }
    ),

    body("title")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters"),
    body("genre")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3})
        .withMessage("Genre must be at least 3 characters"),
    body("releaseDate")
        .optional()
        .isISO8601()
        .withMessage("ReleaseDate must be a valid date"),
    body("developer")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage("Developer must be at least 3 characters"),
    handleValidationErrors,

]

export const validateGameId = [
    param("id")
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage("Id must be a positive integer"),
    handleValidationErrors,
]

export const validateGameQuery = [
    query('search')
        .optional()
        .isString()
        .withMessage("Search must be a string")
        .trim()
        .isLength({ max: 50})
        .withMessage("Search must be at most 50 characters"),

    query('sortBy')
        .optional()
        .isIn(["id","title", "genre", "releaseDate", "developer"])
        .withMessage("sortBy must be one of id, title, genre, releaseDate, developer"),
    query('order')
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("order must be either asc or desc"),
    query('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage("offset must be a non-negative integer"),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage("limit must be a positive integer"),
    handleValidationErrors,
]
