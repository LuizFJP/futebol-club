import User from '../database/models/Users';

class LoginModel {
  public static async loginModel(email: string) {
    const user = await User.findOne({ where: { email }, raw: true });

    return user;
  }
}

export default LoginModel;
