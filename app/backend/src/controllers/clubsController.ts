import { Request, Response } from 'express';
import ClubsService from '../services/clubsService';

class Clubs {
  static _ClubService = new ClubsService();

  public static async getAllClubs(_req: Request, res: Response) {
    const clubs = await ClubsService.getAllClub();
    return res.status(200).json(clubs);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const club = await ClubsService.getByIdService(JSON.parse(id));
    return res.status(200).json(club);
  }
}

export default Clubs;
