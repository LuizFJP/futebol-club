import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import matchsService from '../services/matchsService';

class MatchsController {
  public static async getByProgress(inProgress: string | ParsedQs | string[] | ParsedQs[]) {
    const matchs = await matchsService.getByProgressService(inProgress);
    return matchs;
  }

  public static async getAllMatchs(req: Request, res: Response) {
    let matchs;
    const { inProgress } = req.query;
    if (inProgress) {
      matchs = await MatchsController.getByProgress(inProgress);
    } else {
      matchs = await matchsService.getAllMatchsService();
    }

    return res.status(200).json(matchs);
  }
}

export default MatchsController;
