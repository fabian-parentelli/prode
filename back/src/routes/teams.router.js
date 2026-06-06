import Router from './routes.js';
import * as controller from '../controllers/teams.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class TeamsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getTeams);
    };
};
