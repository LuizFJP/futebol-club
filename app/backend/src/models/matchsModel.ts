import { IMatchs } from '../utils/interfaces';
import Club from '../database/models/Clubs';
import Match from '../database/models/Matchs';

class MatchsModel {
  private _Match = Match;

  public async getByProgressModel(inProgress: boolean) {
    const matchs = await this._Match.findAll({
      where: { inProgress },
      include: [{ model: Club,
        as: 'homeClub',
        attributes: { exclude: ['id'] },
      },
      {
        model: Club,
        as: 'awayClub',
        attributes: { exclude: ['id'] },
      }],
      nest: true,
    });

    return matchs;
  }

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

  public async createMatch(payload: IMatchs) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = payload;
    const id = await this._Match.create(payload);
    const result = {
      id: id.id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress };
    return result;
  }

  public async updateInProgressFalse(id: string) {
    await this._Match.update({ inProgress: false }, { where: { id } });
    const team = await this._Match.findByPk(id);
    return team;
  }

  public async updateGoals(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this._Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}

export default new MatchsModel();
