import clubsService from '../services/clubsService';

class Clubs {
  static _ClubService = clubsService;

  public static getAllClubs() {
    const clubs = this._ClubService;
    return clubs;
  }
}

export default Clubs;
