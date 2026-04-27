import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from "../services/reviewService.js";

export async function createReviewHandler(req, res){
    const { title, content, rating, gameId } = req.body;
    const newReview = await createReview({ title, content, rating, gameId, authorId: req.user.id });
    res.status(201).json(newReview);
}

export async function getAllReviewsHandler(req, res){
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
}

export async function getReviewByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    res.status(200).json(review);
}

export async function updateReviewHandler(req, res){
    const id = parseInt(req.params.id);
    const { title, content, rating} = req.body;
    const updatedReview = await updateReview(id, { title, content, rating });
    res.status(200).json(updatedReview);
}

export async function deleteReviewHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteReview(id);
    res.status(204).send();
}