import { predictionsManager } from '../dao/manager/index.manager.js';

export default class PredictionsRepository {

    getPredictions = async (query, get = {}) => {
        const result = await predictionsManager.getPredictions(query, get);
        return result;
    };

    getPrediction = async (query, get = {}) => {
        const result = await predictionsManager.getPrediction(query, get);
        return result;
    };

    createPrediction = async (prediction) => {
        const result = await predictionsManager.createPrediction(prediction);
        return result;
    };

    updatePrediction = async (query, update) => {
        const result = await predictionsManager.updatePrediction(query, update);
        return result;
    };

};
