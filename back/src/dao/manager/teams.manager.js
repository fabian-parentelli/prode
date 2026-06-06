import { teamsModel } from '../models/teams.model.js';

export default class Teams {

    getTeams = async (query, get) => {
        return await teamsModel.find(query, get).lean();
    };

    getTeam = async (query, get) => {
        return await teamsModel.findOne(query, get).lean();
    };

};