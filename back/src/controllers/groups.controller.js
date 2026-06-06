import * as service from '../services/groups.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getGroups = async (req, res) => {
    try {
        const result = await service.getGroups();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const postManyGroups = async (req, res) => {
    try {
        const result = await service.postManyGroups(req.body);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateGroups = async (req, res) => {
    try {
        const result = await service.updateGroups(req.body);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getGroups, postManyGroups, updateGroups };
