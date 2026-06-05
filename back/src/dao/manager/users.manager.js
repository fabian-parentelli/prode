import { userModel } from '../models/users.model.js';

export default class User {

    postUser = async (user) => {
        return await userModel.create(user);
    };

    getUser = async (query, get) => {
        return await userModel.findOne(query, get).lean();
    };

};