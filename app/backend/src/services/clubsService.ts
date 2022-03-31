import clubsModel from '../models/clubsModel';

class Clubs {
  private static _clubsModel = clubsModel;

  public static async getAllClub() {
    const clubs = await this._clubsModel.getAllModel();
    return clubs;
  }

  public static async getByIdService(id: number) {
    const club = await this._clubsModel.getByIdModel(id);
    return club;
  }
}

export default Clubs;
