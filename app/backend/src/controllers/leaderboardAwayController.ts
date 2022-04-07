import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class Leaderboard {
  public static async createLeaderboard(_req: Request, res: Response) {
    const leaderboad = await LeaderboardService.createLeaderboardAway();

    return res.status(200).json(leaderboad);
  }
}

export default Leaderboard;
