import { predictionsModel } from '../models/predictions.model.js';

export default class Predictions {

    getPredictions = async (query, get) => {
        return await predictionsModel.find(query, get).lean();
    };

    getPrediction = async (query, get) => {
        return await predictionsModel.findOne(query, get).lean();
    };

    createPrediction = async (prediction) => {
        return await predictionsModel.create(prediction);
    };

    updatePrediction = async (query, update) => {
        return await predictionsModel.findOneAndUpdate(query, update, { returnDocument: 'after', upsert: true }).lean();
    };

};
