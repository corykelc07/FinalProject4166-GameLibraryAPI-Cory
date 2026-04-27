import express from "express";
import { createReviewHandler, getAllReviewsHandler, getReviewByIdHandler, updateReviewHandler, deleteReviewHandler } from "../controllers/reviewController.js";
import { authenticate } from "../middleware/authenticate.js";
import { checkReviewOwnership, checkReviewOwnershipOrAdmin } from "../middleware/ownership.js";
import { validateReviewCreate, validateReviewUpdate, validateReviewId } from "../middleware/reviewValidators.js";

const router = express.Router();  

router.post('/', authenticate, validateReviewCreate, createReviewHandler);
router.get('/', getAllReviewsHandler);
router.get('/:id', validateReviewId, getReviewByIdHandler);
router.put('/:id', authenticate, validateReviewId, checkReviewOwnership, validateReviewUpdate, updateReviewHandler);
router.delete('/:id', authenticate, validateReviewId, checkReviewOwnershipOrAdmin, deleteReviewHandler);

export default router;