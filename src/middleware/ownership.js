import { getReviewById } from "../services/reviewService.js";
import { getCommentById } from "../services/commentService.js";

export async function checkReviewOwnership(req, res, next) {
    try {
        const review = await getReviewById(parseInt(req.params.id));

        if (review.authorId !== req.user.id) {
            const error = new Error('You do not have permission to perform this action');
            error.status = 403;
            throw error;
        }
        
        req.review = review;
        next();
    } catch (error) {
        next(error);
    }
}

export async function checkReviewOwnershipOrAdmin(req, res, next) {
    try {
        const review = await getReviewById(parseInt(req.params.id));

        if (review.authorId !== req.user.id && req.user.role !== 'ADMIN') {
            const error = new Error('You do not have permission to perform this action');
            error.status = 403;
            throw error;
        }
        
        req.review = review;
        next();
    } catch (error) {
        next(error);
    }
}

export async function checkCommentOwnership(req, res, next) {
    try {
        const comment = await getCommentById(parseInt(req.params.id));

        if (comment.authorId !== req.user.id) {
            const error = new Error('You do not have permission to perform this action');
            error.status = 403;
            throw error;
        }

        req.comment = comment;
        next();
    } catch (error) {
        next(error);
    }
}

export async function checkCommentOwnershipOrAdmin(req, res, next) {
    try {
        const comment = await getCommentById(parseInt(req.params.id));

        if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
            const error = new Error('You do not have permission to perform this action');
            error.status = 403;
            throw error;
        }

        req.comment = comment;
        next();
    } catch (error) {
        next(error);
    }
}