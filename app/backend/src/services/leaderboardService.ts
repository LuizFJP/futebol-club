// import Team from 'src/models/clubLeaderBoard';
import leaderboardModel from '../models/leaderboardModel';

class LeaderboardService {
  public static async createLeaderboardService() {
    const clubs = await leaderboardModel.createLeaderboardModel();

    // const calculateClubs = await clubs.map((club) => {
    //   const team = new Team(club.clubName, club.homeMatch.length);
    // })
    return clubs;
  }
}

export default LeaderboardService;
