import Router from './routes.js';
import * as controller from '../controllers/stadiums.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class StadiumsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getStadiums);
        this.get('/:sid', ['PUBLIC'], passportEnum.NOTHING, controller.getStadium);
    };
};
