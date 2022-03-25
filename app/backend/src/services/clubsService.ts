import clubsModel from '../models/clubsModel';

class Clubs {
  private _clubsModel = clubsModel;

  public async getAllClub() {
    const clubs = await this._clubsModel.getAllModel();
    return clubs;
  }

  public async getByIdService(id: number) {
    const club = await this._clubsModel.getByIdModel(id);
    return club;
  }
}

export default new Clubs();
