import User from './users.manager.js';
import Teams from './teams.manager.js';
import Stadiums from './stadiums.manager.js';
import Groups from './groups.manager.js';
import Games from './games.manager.js';

export const userManager = new User();
export const teamsManager = new Teams();
export const stadiumsManager = new Stadiums();
export const groupsManager = new Groups();
export const gamesManager = new Games();