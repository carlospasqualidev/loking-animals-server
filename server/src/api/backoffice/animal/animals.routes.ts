// LIBS
import { Router } from 'express';

// VALIDATORS
import { isBackoffice } from '../../../middlewares/permissions/isBackoffice';

// FUNCTIONS
import { createAnimal } from './controllers/create';

// ROUTES
export const userRouter = Router();

userRouter.post('/create', isBackoffice, createAnimal);
