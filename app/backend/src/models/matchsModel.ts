import { Op, Sequelize } from 'sequelize';
import Club from '../database/models/Clubs';
import Match from '../database/models/Matchs';

class MatchsModel {
  private _Match = Match;

  private _true = true;

  private _false = false;

  public async getAllMatchsModel() {
    const matchs = await this._Match.findAll({
      nest: true,
      include: [{ model: Club,
        as: 'homeClub',
        attributes: { exclude: ['id'] },
      },
      {
        model: Club,
        as: 'awayClub',
        attributes: { exclude: ['id'] },
      }],
    });
    return matchs;
  }
}

export default new MatchsModel();
