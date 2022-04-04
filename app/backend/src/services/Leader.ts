import { ILeader, IMatchs } from '../utils/interfaces';

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

  public countGoals(homeMatch: IMatchs[]) {
    homeMatch.forEach((h: IMatchs) => {
      this._team.goalsFavor += h.homeTeamGoals;
      this._team.goalsOwn += h.awayTeamGoals;
    });
  }

  public calculatePoints(homeMatch: IMatchs[]) {
    homeMatch.forEach((h: IMatchs) => {
      if (h.homeTeamGoals > h.awayTeamGoals) {
        this._team.totalVictories += 1;
        this._team.totalPoints += 3;
      } else if (h.homeTeamGoals < h.awayTeamGoals) {
        this._team.totalLosses += 1;
      } else {
        this._team.totalPoints += 1;
      }
    });
  }
}

export default Leader;
