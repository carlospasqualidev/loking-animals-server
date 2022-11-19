// LIBS
import { Router } from 'express';

// FUNCTIONS
import { createAnimal } from './controllers/create';
import { createActionHistory } from './controllers/createActionHistory';
import { dashBoardAnimalActionHistory } from './controllers/dashBoardAnimalActionHistory';
import { animalsList } from './controllers/list';

// ROUTES
export const animalRouter = Router();

animalRouter.post('/create', createAnimal);

animalRouter.post('/create/action', createActionHistory);

animalRouter.get('/dashboard', dashBoardAnimalActionHistory);

animalRouter.get('/list', animalsList);
