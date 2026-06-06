import { groupsManager } from '../dao/manager/index.manager.js';

export default class GroupsRepository {

    postManyGroups = async (groups) => {
        const result = await groupsManager.postManyGroups(groups);
        return result;
    };

    getGroups = async (query, get = {}) => {
        const result = await groupsManager.getGroups(query, get);
        return result;
    };

    getGroup = async (query, get = {}) => {
        const result = await groupsManager.getGroup(query, get);
        return result;
    };

    updateGroups = async (groups) => {
        const result = await groupsManager.updateGroups(groups);
        return result;
    };

};
