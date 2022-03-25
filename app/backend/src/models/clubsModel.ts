import Clubs from '../database/models/Clubs';

class ClubsModel {
  private _clubsModel = Clubs;

  public async getAllModel() {
    const clubs = this._clubsModel.findAll();
    return clubs;
  }
}

export default new ClubsModel();
