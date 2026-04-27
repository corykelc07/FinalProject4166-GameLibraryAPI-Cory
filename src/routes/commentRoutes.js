import express from 'express';
import { createCommentHandler, deleteCommentHandler, getAllCommentsHandler, getCommentByIdHandler, updateCommentHandler } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';
import { checkCommentOwnership, checkCommentOwnershipOrAdmin } from '../middleware/ownership.js';
import { validateCommentCreate, validateCommentUpdate, validateCommentId } from '../middleware/commentValidators.js';

const router = express.Router();

router.post('/', authenticate, validateCommentCreate, createCommentHandler);
router.get('/', getAllCommentsHandler);
router.get('/:id', validateCommentId, getCommentByIdHandler);
router.put('/:id', authenticate, validateCommentId, checkCommentOwnership, validateCommentUpdate, updateCommentHandler);
router.delete('/:id', authenticate, validateCommentId, checkCommentOwnershipOrAdmin, deleteCommentHandler);

export default router;