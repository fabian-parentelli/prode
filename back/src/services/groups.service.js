import { groupsRepository, teamsRepository } from '../repositories/index.repositories.js';
import { groupsDto } from '../dto/groups.dto.js';

const getGroups = async () => {
    const groups = await groupsRepository.getGroups({});
    const teams = await teamsRepository.getTeams({});
    const result = groupsDto(groups, teams);
    return { status: 'success', result };
};

const postManyGroups = async (body) => {
    const result = await groupsRepository.postManyGroups(body);
    return { status: 'success', result };
};

const updateGroups = async (body) => {
    const result = await groupsRepository.updateGroups(body);
    return { status: 'success', result };
};

export { getGroups, postManyGroups, updateGroups };