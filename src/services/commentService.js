import { create, getAll, getById, update, remove } from '../repositories/commentRepo.js';

export async function createComment(commentData){
    return await create(commentData);
}

export async function getAllComments(){
    return await getAll();
}

export async function getCommentById(id) {
    const comment = await getById(id);
    if (comment) return comment;
    else{
        const error = new Error(`Comment with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function updateComment(id, updatedData){
    const updatedComment = await update(id, updatedData);
    if (updatedComment) return updatedComment;
    else{
        const error = new Error(`Comment with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteComment(id){
    const result = await remove(id);
    if (result) return;
    else{
        const error = new Error(`Comment with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}