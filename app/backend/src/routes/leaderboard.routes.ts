import { Router } from 'express';
import Leaderboard from '../controllers/leaderboardController';

const route = Router();

route.get('/home', Leaderboard.createLeaderboard);

export default route;
