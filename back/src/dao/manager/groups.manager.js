import { groupsModel } from '../models/groups.model.js';

export default class Groups {

    postManyGroups = async (groups) => {
        return await groupsModel.insertMany(groups);
    };

    getGroups = async (query, get) => {
        return await groupsModel.find(query, get).lean();
    };

    getGroup = async (query, get) => {
        return await groupsModel.findOne(query, get).lean();
    };

    updateGroups = async (groups) => {
        await groupsModel.deleteMany({});
        return await groupsModel.insertMany(groups);
    };

};
