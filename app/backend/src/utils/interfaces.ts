export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IMatchs {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
