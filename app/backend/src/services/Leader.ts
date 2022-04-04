import { ILeader } from '../utils/interfaces';

class Leader {
  private _team: {
    name: string,
    totalPoints: number,
    totalGames: number,
    totalVictories: number,
    totalDraws: number,
    totalLosses: number,
    goalsFavor: number,
    goalsOwn: number,
    goalsBalance: number,
    efficiency: number,
  };

  constructor(team: ILeader) {
    this._team = {
      name: team.clubName,
      totalPoints: 0,
      totalGames: team.homeMatch.length,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0 };
  }
}

export default Leader;
