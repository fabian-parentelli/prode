import { teamsManager } from '../dao/manager/index.manager.js';

export default class TeamsRepository {

    getTeams = async (query, get = {}) => {
        const result = await teamsManager.getTeams(query, get);
        return result;
    };

    getTeam = async (query, get = {}) => {
        const result = await teamsManager.getTeam(query, get);
        return result;
    };

};
