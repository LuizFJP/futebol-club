export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IMatchs {
  homeTeam?: number,
  awayTeam?: number,
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
  message?: string,
  code?: number,
}

export interface ILeader {
  clubName: string,
  homeMatch: [{
    totalGames: number,
    totalVictories: number,
    totalDraws: number,
    totalLosses: number,
    goalsFavor: number,
    goalsOwn: number,
    goalsBalance: number,
    efficiency: number }]
}

export interface IBoarder {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IAllClubs {
  id: number,
  clubName: string
}

export interface ILeaderBoardHome extends IAllClubs {
  homeMatch: IBoarder[]
}

export interface ILeaderBoardAway extends IAllClubs {
  awayMatch: IBoarder[]
}

export interface IPuzzledMatch {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
