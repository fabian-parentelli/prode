import Router from './routes.js';
import { passportEnum } from '../config/enums.config.js';
import { normalizeMatch } from '../utils/normalizeMatch.utils.js';
import { gamesRepository } from '../repositories/index.repositories.js'

export default class TestRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, async (req, res) => {
            console.log('\x1b[38;5;208m######## Entra al Testing #########\x1b[0m');

            try {

                const result = await gamesRepository.getGames({ matchday: '1' })
                console.log(result);
                

                res.send({ status: 'testing' });

            } catch (error) {
                console.error('Error:', error.message);
                res.status(500).send({ status: 'error', message: error.message });
            }
        });
    };
};