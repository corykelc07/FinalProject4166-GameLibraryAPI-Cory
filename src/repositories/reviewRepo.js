import prisma from "../config/db.js";

export async function create(reviewData){
    try {
        const newReview = await prisma.review.create({
            data: {
                title: reviewData.title,
                content: reviewData.content,
                authorId: reviewData.authorId,
                rating: reviewData.rating,
                gameId: reviewData.gameId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                game: true,
            }
        });
        return newReview;
    } catch (error) {
        if (error.code === 'P2003') {
            const err = new Error(`Game with id ${reviewData.gameId} does not exist`);
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function getAll(){
    const reviews = await prisma.review.findMany();
    return reviews;
}

export async function getById(id){
    const review = await prisma.review.findUnique({
        where: { id },
    });
    return review;
}

export async function update(id, updatedData){
    try {
        const data = {};
        if (updatedData.title !== undefined) data.title = updatedData.title;
        if (updatedData.content !== undefined) data.content = updatedData.content;
        if (updatedData.rating !== undefined) data.rating = updatedData.rating;
        
        const updatedReview = await prisma.review.update({
            where: { id },
            data,
        });
        return updatedReview;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedReview = await prisma.review.delete({
            where: { id }
        });
        return deletedReview;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}