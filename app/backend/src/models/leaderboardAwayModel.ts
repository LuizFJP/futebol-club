// import { ILeaderBoardHome } from '../utils/interfaces';
import Club from '../database/models/Clubs';
import Match from '../database/models/Matchs';

class LeaderboadAwayModel {
  public static async createLeaderboardModel() {
    const clubs = await Club.findAll({ include: [
      { model: Match,
        as: 'awayMatch',
        where: { inProgress: false },
      }] });
      //  as unknown as ILeaderBoardHome[];
    return clubs;
  }
}

export default LeaderboadAwayModel;
