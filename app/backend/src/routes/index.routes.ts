import { Router } from 'express';
import route from './login.routes';
import clubsRoute from './clubs.routes';

const routeMain = Router();

routeMain.use('/login', route);
routeMain.use('/clubs', clubsRoute);

export default routeMain;
