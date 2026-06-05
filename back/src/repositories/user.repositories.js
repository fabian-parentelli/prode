import { userManager } from '../dao/manager/index.manager.js';

export default class UserRepository {

    postUser = async (user) => {
        const result = await userManager.postUser(user);
        return result.toObject();
    };

    getUser = async (query, get = {}) => {
        const result = await userManager.getUser(query, get);
        return result;
    };

};