import { stadiumsManager } from '../dao/manager/index.manager.js';

export default class StadiumsRepository {

    getStadiums = async (query, get = {}) => {
        const result = await stadiumsManager.getStadiums(query, get);
        return result;
    };

    getStadium = async (query, get = {}) => {
        const result = await stadiumsManager.getStadium(query, get);
        return result;
    };

    postManyStadiums = async (stadiums) => {
        const result = await stadiumsManager.postManyStadiums(stadiums);
        return result;
    };

};