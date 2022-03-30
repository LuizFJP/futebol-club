import { Router } from 'express';
import matchsController from '../controllers/matchsController';

const route = Router();

route.get('/', matchsController.getAllMatchs);
route.post('/', matchsController.createMatch);
route.put('/:id/finish', matchsController.updateInProgressFalse);

export default route;
