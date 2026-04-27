import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from "../services/commentService.js";

export async function createCommentHandler(req, res, next){
    const { content, reviewId } = req.body;
    const newComment = await createComment({ content, authorId: req.user.id, reviewId });
    res.status(201).json(newComment);
}

export async function getAllCommentsHandler(req, res, next){
    const comments = await getAllComments();
    res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res, next){
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id);
    res.status(200).json(comment);
}

export async function updateCommentHandler(req, res, next){
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedComment = await updateComment(id, updatedData);
    res.status(200).json(updatedComment);
}

export async function deleteCommentHandler(req, res, next){
    const id = parseInt(req.params.id);
    await deleteComment(id);
    res.status(204).send();
}