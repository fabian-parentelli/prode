import UserRepository from './user.repositories.js';
import TeamsRepository from './teams.repositories.js';
import StadiumsRepository from './stadiums.repositories.js';
import GroupsRepository from './groups.repositories.js';
import GamesRepository from './games.repositories.js';

export const userRepository = new UserRepository();
export const teamsRepository = new TeamsRepository();
export const stadiumsRepository = new StadiumsRepository();
export const groupsRepository = new GroupsRepository();
export const gamesRepository = new GamesRepository();