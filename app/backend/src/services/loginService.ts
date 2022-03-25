import * as bcryptsjs from 'bcryptjs';
import generateKey from '../utils/generateToken';
import User from '../models/loginModel';

const INCORRECT_EMAIL_PASSWORD = 'Incorrect email or password';

export interface IError {
  message: string,
  code: number,
}

export interface IUsera {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string,
}
class LoginService {
  private _UserModel = User;

  static lib = bcryptsjs;

  static _hash: boolean;

  public static convertPassword(password: string, passwordDb: string) {
    this._hash = this.lib.compareSync(password, passwordDb);
    return this._hash;
  }

  public async loginService(email: string, password: string): Promise<IError | IUsera> {
    const user = await this._UserModel.loginModel(email);
    if (!user) return { message: INCORRECT_EMAIL_PASSWORD, code: 401 };
    const hash = LoginService.convertPassword(password, user.password);
    if (!hash) return { message: INCORRECT_EMAIL_PASSWORD, code: 401 };
    const token: string = await generateKey(user);

    const result = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };

    return result;
  }

  public async loginValidateService(email: string, authorization: string) {
    const user = await this._UserModel.loginModel(email);
    if (!user) return { message: INCORRECT_EMAIL_PASSWORD, code: 401 };
    const token = await generateKey(user);
    if (token === authorization) return user.role;
  }
}

export default new LoginService();
