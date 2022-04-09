import { ILeaderBoardHome } from '../utils/interfaces';
import Club from '../database/models/Clubs';
import Match from '../database/models/Matchs';

class LeaderboadModel {
  public static async createLeaderboardModel() {
    const clubs = await Club.findAll({ include: [
      { model: Match,
        as: 'homeMatch',
        where: { inProgress: false },
      }] }) as unknown as ILeaderBoardHome[];

    return clubs;
  }
}

export default LeaderboadModel;
