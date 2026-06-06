import Router from './routes.js';
import * as controller from '../controllers/games.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class GamesRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getGames);
        this.get('/:id', ['PUBLIC'], passportEnum.NOTHING, controller.getGame);
    };
};