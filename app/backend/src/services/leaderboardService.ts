// import Team from 'src/models/clubLeaderBoard';
import leaderboardModel from '../models/leaderboardModel';
import Leader from './Leader';
import { ILeaderBoardHome, IPuzzledMatch } from '../utils/interfaces';

class LeaderboardService {
  public static organize(a: IPuzzledMatch, b: IPuzzledMatch) {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;

    return 1;
  }

  public static async createLeaderboardService() {
    const clubs = await leaderboardModel.createLeaderboardModel();

    const calculateClubs = clubs.map((club: ILeaderBoardHome) => {
      const team = new Leader(club);
      team.calculatePoints(club.homeMatch);
      team.countGoals(club.homeMatch);
      team.calculateGoalsBalance();
      team.calculateEfficiency();
      team.classification();
      return team.team;
    });

    return calculateClubs.sort(LeaderboardService.organize);
  }
}

export default LeaderboardService;
