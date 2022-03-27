import matchsModel from '../models/matchsModel';

class MatchsService {
  private _MatchModel = matchsModel;

  public async getAllMatchsService() {
    const matchs = await this._MatchModel.getAllMatchsModel();
    return matchs;
  }
}

export default new MatchsService();
