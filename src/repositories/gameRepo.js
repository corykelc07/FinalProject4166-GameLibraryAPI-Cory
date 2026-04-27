import prisma from '../config/db.js';

export async function create(gameData){
    try{
        const newGame = await prisma.game.create({
            data: { 
                title: gameData.title,
                genre: gameData.genre,
                releaseDate: new Date(gameData.releaseDate),
                developer: gameData.developer
            }
        });

        return newGame;
    } catch(error){
        if (error.code === 'P2002') {
            const err = new Error('Game title already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function getAll({ search, sortBy, order, offset, limit }){
    const conditions = {};
    if (search) {
        conditions.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { genre: { contains: search, mode: 'insensitive' } },
            { developer: { contains: search, mode: 'insensitive' } },
        ];
    }

    const games = await prisma.game.findMany({
        where: conditions,
        orderBy: { [sortBy]: order },
        skip: offset,
        take: limit,
    });
    return games;
}

export async function getById(id){
    const game = await prisma.game.findUnique({ where: { id } });
    return game;
}

export async function update(id, updatedData){
    try {
        const data = {};
        if (updatedData.title !== undefined) data.title = updatedData.title;
        if (updatedData.genre !== undefined) data.genre = updatedData.genre;
        if (updatedData.releaseDate !== undefined) data.releaseDate = new Date(updatedData.releaseDate);
        if (updatedData.developer !== undefined) data.developer = updatedData.developer;

        const updatedGame = await prisma.game.update({
            where: { id },
            data
        });
        return updatedGame;
    } catch (error) {
        if (error.code === 'P2025') return null;
        if (error.code === 'P2002') {
            const err = new Error('Game title already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedGame = await prisma.game.delete({ where: { id } });
        return deletedGame;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}