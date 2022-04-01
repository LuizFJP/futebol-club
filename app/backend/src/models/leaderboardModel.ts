import Club from '../database/models/Clubs';
import Match from '../database/models/Matchs';

class LeaderboadModel {
  public static async createLeaderboardModel() {
    const clubs = await Club.findAll({ include: [
      { model: Match,
        as: 'homeMatch',
        where: { inProgress: false },
      }] });
    return clubs;
  }
}

export default LeaderboadModel;
