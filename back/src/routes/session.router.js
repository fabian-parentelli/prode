import Router from './routes.js';
import * as sessionController from '../controllers/session.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class SessionRouter extends Router {
    init() {
        // this.post('/logout', ['PUBLIC'], passportEnum.JWT, sessionController.logout);
        this.post('/refresh', ['PUBLIC'], passportEnum.NOTHING, sessionController.postRefresh);
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, sessionController.postSession);
        this.get('/current', ['PUBLIC'], passportEnum.JWT, sessionController.getCurrent);
    };
};