import * as service from '../services/stadiums.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getStadiums = async (req, res) => {
    try {
        const result = await service.getStadiums();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getStadium = async (req, res) => {
    try {
        const { sid } = req.params;
        const result = await service.getStadium(sid);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getStadiums, getStadium };
