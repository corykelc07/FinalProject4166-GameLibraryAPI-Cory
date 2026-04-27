import { createGame, getAllGames, getGameById, updateGame, deleteGame } from '../services/gameService.js';

export async function createGameHandler(req, res){
    const { title, genre, releaseDate, developer } = req.body;
    const newGame = await createGame({ title, genre, releaseDate, developer });
    res.status(201).json(newGame);
}

export async function getAllGamesHandler(req, res){
    const {
        search='',
        sortBy='id',
        order='asc',
        offset=0,
        limit=5,
    } = req.query;

    const options = {
        search,
        sortBy,
        order,
        offset: parseInt(offset),
        limit: parseInt(limit),
    }

    const games = await getAllGames(options);
    res.status(200).json(games);
}

export async function getGameByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const game = await getGameById(id);
    res.status(200).json(game);
}

export async function updateGameHandler(req, res){
    const id = parseInt(req.params.id);
    const { title, genre, releaseDate, developer } = req.body;
    const updatedGame = await updateGame(id, { title, genre, releaseDate, developer });
    res.status(200).json(updatedGame);
}

export async function deleteGameHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteGame(id);
    res.status(204).send();
}