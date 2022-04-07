import { IBoarder, ILeaderBoardHome } from '../utils/interfaces';

class Leader {
  public team: {
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

  constructor(team: ILeaderBoardHome) {
    this.team = {
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

  public countGoals(homeMatch: IBoarder[]) {
    homeMatch.forEach((h: IBoarder) => {
      this.team.goalsFavor += h.homeTeamGoals;
      this.team.goalsOwn += h.awayTeamGoals;
    });
  }

  public calculatePoints(homeMatch: IBoarder[]) {
    homeMatch.forEach((h: IBoarder) => {
      if (h.homeTeamGoals > h.awayTeamGoals) {
        this.team.totalVictories += 1;
        this.team.totalPoints += 3;
      } else if (h.homeTeamGoals < h.awayTeamGoals) {
        this.team.totalLosses += 1;
      } else {
        this.team.totalPoints += 1;
        this.team.totalDraws += 1;
      }
    });
  }

  public calculateGoalsBalance() {
    this.team.goalsBalance = this.team.goalsFavor - this.team.goalsOwn;
  }

  public calculateEfficiency() {
    this.team.efficiency = parseFloat((
      (this.team.totalPoints / (this.team.totalGames * 3)) * 100).toFixed(2));
  }

  public classification() {
    return this.team;
  }
}

export default Leader;
