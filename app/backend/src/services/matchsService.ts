import { ParsedQs } from 'qs';
import { IMatchs } from '../utils/interfaces';
import matchsModel from '../models/matchsModel';

class MatchsService {
  private _MatchModel = matchsModel;

  public async getByProgressService(inProgress: string | ParsedQs | string[] | ParsedQs[]) {
    const progress = await JSON.parse(await JSON.parse(await JSON.stringify(inProgress)));
    const matchs = await this._MatchModel.getByProgressModel(progress);
    return matchs;
  }

  public async getAllMatchsService() {
    const matchs = await this._MatchModel.getAllMatchsModel();
    return matchs;
  }

  public async createMatch(payload: IMatchs): Promise<IMatchs> {
    const { homeTeam, awayTeam } = payload;
    console.log(typeof homeTeam, typeof awayTeam);
    if (homeTeam === awayTeam) {
      return {
        message: 'It is not possible to create a match with two equal teams',
        code: 401,
      };
    }
    const matchCreated = await this._MatchModel.createMatch(payload);
    return matchCreated;
  }

  public async updateInProgressFalse(id: string) {
    const team = await this._MatchModel.updateInProgressFalse(id);
    return team;
  }
}

export default new MatchsService();
