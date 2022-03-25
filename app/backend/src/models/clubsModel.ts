import Clubs from '../database/models/Clubs';

class ClubsModel {
  private _clubsModel = Clubs;

  public async getAllModel() {
    const clubs = await this._clubsModel.findAll({ raw: true });
    console.log(clubs);
    return clubs;
  }
}

export default new ClubsModel();
