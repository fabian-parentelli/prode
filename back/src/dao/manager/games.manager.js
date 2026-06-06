import { gamesModel } from '../models/games.model.js';

export default class Games {

    postManyGames = async (games) => {
        return await gamesModel.insertMany(games);
    };

    getGames = async (query, get) => {
        return await gamesModel.find(query, get).lean();
    };

    getGame = async (query, get) => {
        return await gamesModel.findOne(query, get).lean();
    };

};