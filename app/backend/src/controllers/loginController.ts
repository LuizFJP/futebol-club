import { Request, Response } from 'express';

import LoginService, { IUsera } from '../services/loginService';

class Login {
  public Service = LoginService;

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await LoginService.loginService(email, password) as IUsera;
    const { token } = user;
    req.headers.authorization = token;
    return res.status(200).json(user);
  }

  public static async validateLogin(req: Request, res: Response) {
    const { authorization: token } = req.headers;
    if (!token) return res.status(404).json('Token not found');
    const role = await LoginService.loginValidateService(token);

    return res.status(200).json(role);
  }
}

export default Login;
