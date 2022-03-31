import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { IMatchs } from '../utils/interfaces';
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

  public static async createMatch(req: Request, res: Response) {
    const teste: IMatchs = req.body;
    const id = await matchsService.createMatch(teste);
    if (id.message) return res.status(id.code as number).json({ message: id.message as string });
    return res.status(201).json(id);
  }

  public static async updateInProgressFalse(req: Request, res: Response) {
    const { id } = req.params;
    const team = await matchsService.updateInProgressFalse(id as string);
    if (team) return res.status(200).json(team);
  }

  public static async updateGoals(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    // if (!homeTeamGoals && !awayTeamGoals) 
    const { id } = req.params;
    const team = await matchsService.updateGoals(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(team);
  }
}

export default MatchsController;
