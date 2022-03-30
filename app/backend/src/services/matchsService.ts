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

  public async createMatch(payload: IMatchs) {
    const matchCreated = await this._MatchModel.createMatch(payload);
    return matchCreated;
  }
  
  public async updateInProgressFalse(id: number) {
   const status = await this._MatchModel.updateInProgressFalse(id);
    return status;
  }
}

export default new MatchsService();
