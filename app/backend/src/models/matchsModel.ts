import Match from '../database/models/Matchs';

class MatchsModel {
  private _Match = Match;

  public async getAllMatchsModel() {
    const matchs = await this._Match.findAll({ raw: true });
    return matchs;
  }
}

export default new MatchsModel();
