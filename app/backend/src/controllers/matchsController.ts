import { Request, Response } from 'express';
import matchsService from '../services/matchsService';

class MatchsController {
  public static async getAllMatchs(_req: Request, res: Response) {
    const matchs = await matchsService.getAllMatchsService();
    return res.status(200).json(matchs);
  }
}

export default MatchsController;
