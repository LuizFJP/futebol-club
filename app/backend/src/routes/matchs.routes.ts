import { Router } from 'express';
import matchsController from '../controllers/matchsController';

const route = Router();

route.get('/', matchsController.getAllMatchs);
route.post('/', matchsController.createMatch);
route.patch('/:id/finish', matchsController.updateInProgressFalse);
route.patch('/:id', matchsController.updateGoals);

export default route;
