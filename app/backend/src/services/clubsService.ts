import clubsModel from '../models/clubsModel';

class Clubs {
  private _clubsModel = clubsModel;

  public async getAllClub() {
    const clubs = await this._clubsModel.getAllModel();
    return clubs;
  }
}

export default new Clubs();
