import { ParsedQs } from 'qs';
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
}

export default new MatchsService();
