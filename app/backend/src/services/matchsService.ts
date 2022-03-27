import matchsModel from '../models/matchsModel';

class MatchsService {
  public async getAllMatchsService() {
    const matchs = await matchsModel.getAllMatchsModel();
    return matchs;
  }
}

export default new MatchsService();
