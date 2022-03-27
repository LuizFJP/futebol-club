import Match from '../database/models/Matchs';

class MatchsModel {
  public async getAllMatchsModel() {
    const matchs = await Match.findAll({ raw: true });
    return matchs;
  }
}
