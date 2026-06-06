import * as service from '../services/teams.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getTeams = async (req, res) => {
    try {
        const result = await service.getTeams();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getTeams };