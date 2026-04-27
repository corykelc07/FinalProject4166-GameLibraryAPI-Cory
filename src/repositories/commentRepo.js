import prisma from "../config/db.js";

export async function create(commentData){
    try{
        const newComment = await prisma.comment.create({
            data: {
                content: commentData.content,
                authorId: commentData.authorId,
                reviewId: commentData.reviewId,
            },
        });
        return newComment;
    } catch (error) {
        if (error.code === 'P2003') {
            const err = new Error(`Review with id ${commentData.reviewId} does not exist`);
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function getAll(){
    const comments = await prisma.comment.findMany();
    return comments;
}

export async function getById(id) {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  return comment;
}

export async function update(id, updatedData){
    try {
        const data = {};
        if (updatedData.content !== undefined) data.content = updatedData.content;
        
        const updatedComment = await prisma.comment.update({
        where: { id },
        data,
        });

        return updatedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedComment = await prisma.comment.delete({
            where: { id },
        });
        return deletedComment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}