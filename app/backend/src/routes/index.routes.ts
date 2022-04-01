import { Router } from 'express';
import route from './login.routes';
import clubsRoute from './clubs.routes';
import matchsRoute from './matchs.routes';
import leaderboardRoute from './leaderboard.routes';

const routeMain = Router();

routeMain.use('/login', route);
routeMain.use('/clubs', clubsRoute);
routeMain.use('/matchs', matchsRoute);
routeMain.use('/leaderboard', leaderboardRoute);
export default routeMain;
