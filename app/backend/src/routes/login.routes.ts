import { Router } from 'express';
import Login from '../controllers/loginController';
import { verifyPassword, verifyEmail } from '../utils/validations';

const route = Router();

route.post('/', verifyPassword, verifyEmail, Login.login);
route.get('/validate', Login.validateLogin);

export default route;
