import jwt from 'jsonwebtoken';
import env from '../config/env.config.js';
import { CustomNotFound } from './custom-exceptions.utils.js';

const generateTokens = (user) => {
    const accessToken = jwt.sign({ user, type: 'prode_access' }, env.jwtPrivateKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ user, type: 'prode_refresh' }, env.jwtPrivateRefresh, { expiresIn: '1y' });
    return { accessToken, refreshToken };
};

const verifyToken = (refreshToken) => {
    const { user, type } = jwt.verify(refreshToken, env.jwtPrivateRefresh);
    if (type !== 'prode_refresh') throw new CustomNotFound('Token inválido para refresh');
    const accessToken = jwt.sign({ user }, env.jwtPrivateKey, { expiresIn: '30m' });
    return accessToken;
};

export { generateTokens, verifyToken };