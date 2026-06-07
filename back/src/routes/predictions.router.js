import Router from './routes.js';
import * as controller from '../controllers/predictions.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class PredictionsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getPredictions);
        this.get('/:userId', ['PUBLIC'], passportEnum.NOTHING, controller.getUserPredictions);
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, controller.savePredictions);
        this.post('/points', ['PUBLIC'], passportEnum.NOTHING, controller.updatePoints);
    };
};
