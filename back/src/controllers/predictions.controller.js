import * as service from '../services/predictions.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getPredictions = async (req, res) => {
    try {
        const result = await service.getPredictions();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getUserPredictions = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await service.getUserPredictions(userId);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const savePredictions = async (req, res) => {
    try {
        const { userId, predictions } = req.body;
        const result = await service.savePredictions(userId, predictions);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updatePoints = async (req, res) => {
    try {
        const { gameId, home, away } = req.body;
        const result = await service.updatePoints(gameId, home, away);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getPredictions, getUserPredictions, savePredictions, updatePoints };
