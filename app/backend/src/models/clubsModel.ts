import Clubs from '../database/models/Clubs';

class ClubsModel {
  private _clubsModel = Clubs;

  public async getAllModel() {
    const clubs = await this._clubsModel.findAll({ raw: true });
    return clubs;
  }

  public async getByIdModel(id: number) {
    const club = await this._clubsModel.findOne({ raw: true, where: { id } });
    return club;
  }
}

export default new ClubsModel();
