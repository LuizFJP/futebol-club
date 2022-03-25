import { Router } from 'express';
import Clubs from '../controllers/clubsController';

const route = Router();

route.get('/', Clubs.getAllClubs);
