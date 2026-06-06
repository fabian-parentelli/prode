import { teamsRepository } from '../repositories/index.repositories.js';

const getTeams = async () => {
    const result = await teamsRepository.getTeams({});
    return { status: 'success', result };
};

export { getTeams };