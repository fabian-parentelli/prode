import * as service from '../services/games.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getGames = async (req, res) => {
    try {
        const result = await service.getGames();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.getGame(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getGames, getGame };
