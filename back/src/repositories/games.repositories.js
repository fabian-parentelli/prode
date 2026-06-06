import { gamesManager } from '../dao/manager/index.manager.js';

export default class GamesRepository {

    postManyGames = async (games) => {
        const result = await gamesManager.postManyGames(games);
        return result;
    };

    getGames = async (query, get = {}) => {
        const result = await gamesManager.getGames(query, get);
        return result;
    };

    getGame = async (query, get = {}) => {
        const result = await gamesManager.getGame(query, get);
        return result;
    };

};
