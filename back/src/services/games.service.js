import { gamesRepository, teamsRepository, stadiumsRepository } from '../repositories/index.repositories.js';
import { gamesDto } from '../dto/games.dto.js';

const getGames = async () => {
    const games = await gamesRepository.getGames({});
    const teams = await teamsRepository.getTeams({});
    const stadiums = await stadiumsRepository.getStadiums({});
    const result = gamesDto(games, teams, stadiums);
    return { status: 'success', result };
};

const getGame = async (id) => {
    const result = await gamesRepository.getGame({ id });
    return { status: 'success', result };
};

export { getGames, getGame };