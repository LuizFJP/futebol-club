// import Team from 'src/models/clubLeaderBoard';
import leaderboardModel from '../models/leaderboardModel';
import LeaderboadAwayModel from '../models/leaderboardAwayModel';
import Leader from './Leader';
import LeaderAway from './leaderAway';
import { ILeaderBoardAway, ILeaderBoardHome, IPuzzledMatch } from '../utils/interfaces';

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

  public static async createLeaderboardAway() {
    const clubs = await LeaderboadAwayModel.createLeaderboardModel();

    const calculateClubs = clubs.map((club: ILeaderBoardAway) => {
      const team = new LeaderAway(club);
      team.calculatePoints(club.awayMatch);
      team.countGoals(club.awayMatch);
      team.calculateGoalsBalance();
      team.calculateEfficiency();
      team.classification();
      return team.team;
    });
    return calculateClubs.sort(LeaderboardService.organize);
  }
}

export default LeaderboardService;
