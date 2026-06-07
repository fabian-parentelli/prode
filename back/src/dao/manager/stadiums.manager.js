import { stadiumsModel } from '../models/stadiums.model.js';

export default class Stadiums {

    getStadiums = async (query, get) => {
        return await stadiumsModel.find(query, get).lean();
    };

    getStadium = async (query, get) => {
        return await stadiumsModel.findOne(query, get).lean();
    };

};