import { Request, Response } from 'express';
import clubsService from '../services/clubsService';

class Clubs {
  static _ClubService = clubsService;

  public static async getAllClubs(_req: Request, res: Response) {
    const clubs = await clubsService.getAllClub();
    return res.status(200).json(clubs);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const club = await clubsService.getByIdService(JSON.parse(id));
    return res.status(200).json(club);
  }
}

export default Clubs;
