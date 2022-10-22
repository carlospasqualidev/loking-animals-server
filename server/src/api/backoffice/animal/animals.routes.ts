// LIBS
import { Router } from 'express';

// VALIDATORS
import { isBackoffice } from '../../../middlewares/permissions/isBackoffice';

// FUNCTIONS
import { createAnimal } from './controllers/create';
import { animalsList } from './controllers/list';

// ROUTES
export const animalRouter = Router();

animalRouter.post('/create', isBackoffice, createAnimal);
// animalRouter.get('/list', isBackoffice, animalsList);
animalRouter.get('/list', animalsList);
