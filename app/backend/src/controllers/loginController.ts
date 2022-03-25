import { Request, Response } from 'express';

import LoginService, { IUsera } from '../services/loginService';
import getEmailFromToken from '../utils/getEmailFromToken';

class Login {
  public Service = LoginService;

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await LoginService.loginService(email, password) as IUsera;
    const { token } = user;
    req.headers.authorization = token;
    console.log(req.headers.authorization );
    return res.status(200).json(user);
  }

  public static async validateLogin(req: Request, res: Response) {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) return 'error';
    const email = await getEmailFromToken(authorization);
    const role = await LoginService.loginValidateService(email, authorization);
    console.log(role);
    return res.status(200).json(role);
  }
}

export default Login;
