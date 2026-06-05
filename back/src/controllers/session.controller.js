import * as service from '../services/session.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import env from '../config/env.config.js';

const isDev = env.environment === 'development';

const postSession = async (req, res) => {
    try {
        const { accessToken, refreshToken, result } = await service.postSession({ ...req.body });
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        const thirtyMinutes = 30 * 60 * 1000;
        res.cookie('prode_accessToken', accessToken, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'strict', maxAge: thirtyMinutes });
        res.cookie('prode_refreshToken', refreshToken, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'strict', maxAge: oneYear });
        return res.sendSuccess({ status: 'success', result });
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const postRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No token' });
    try {
        const result = await service.postRefresh(refreshToken);
        const thirtyMinutes = 30 * 60 * 1000;
        res.cookie('accessToken', result, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'strict', maxAge: thirtyMinutes });
        if (result) return res.sendSuccess({ status: 'success' });
    } catch (error) {
        if (error instanceof CustomNotFound) return res.status(401).send({ error: error.message });
        res.sendServerError(error.message);
    };
};

const getCurrent = async (req, res) => {
    try {
        const result = await service.getCurrent({ ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postSession, postRefresh, getCurrent };