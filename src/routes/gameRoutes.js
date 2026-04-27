import express from "express";
import { createGameHandler, getAllGamesHandler, getGameByIdHandler, updateGameHandler, deleteGameHandler } from "../controllers/gameController.js";

import { validateGameCreate, validateGameUpdate, validateGameId, validateGameQuery} from "../middleware/gameValidators.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";


const router = express.Router();

router.post('/', authenticate, authorizeRoles('ADMIN'), validateGameCreate, createGameHandler);
router.get('/', validateGameQuery, getAllGamesHandler);
router.get('/:id', validateGameId, getGameByIdHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateGameId, validateGameUpdate, updateGameHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateGameId, deleteGameHandler);

export default router;