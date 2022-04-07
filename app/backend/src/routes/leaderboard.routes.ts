import { Router } from 'express';
import Leaderboard from '../controllers/leaderboardController';
import LeaderboardAway from '../controllers/leaderboardAwayController';

const route = Router();

route.get('/home', Leaderboard.createLeaderboard);
route.get('/away', LeaderboardAway.createLeaderboard);

export default route;
