import Router from './routes.js';
import * as controller from '../controllers/groups.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class GroupsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getGroups);
        this.post('/many', ['PUBLIC'], passportEnum.NOTHING, controller.postManyGroups);
        this.put('/', ['PUBLIC'], passportEnum.NOTHING, controller.updateGroups);
    };
};
