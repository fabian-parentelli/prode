import SessionRouter from "./session.router.js";
import TestRouter from "./test.router.test.js";
import TeamsRouter from "./teams.router.js";
import GroupsRouter from "./groups.router.js";
import GamesRouter from "./games.router.js";
import StadiumsRouter from "./stadiums.router.js";
import PredictionsRouter from "./predictions.router.js";

export const sessionRouter = new SessionRouter().getRouter();
export const testRouter = new TestRouter().getRouter();
export const teamsRouter = new TeamsRouter().getRouter();
export const groupsRouter = new GroupsRouter().getRouter();
export const gamesRouter = new GamesRouter().getRouter();
export const stadiumsRouter = new StadiumsRouter().getRouter();
export const predictionsRouter = new PredictionsRouter().getRouter();