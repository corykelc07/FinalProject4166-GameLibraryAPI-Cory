import { create, getAll, getById, update, remove } from '../repositories/gameRepo.js';

export async function createGame(gameData){
    return await create(gameData);
}

export async function getAllGames(options){
    return getAll(options);
}

export async function getGameById(id) {
    const game = await getById(id);
    if (game) return game;
    else{
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function updateGame(id, updatedData){
    const updatedGame = await update(id, updatedData);
    if (updatedGame) return updatedGame;
    else{
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteGame(id){
    const result = await remove(id);
    if (result) return;
    else{
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        throw error;
    }
}