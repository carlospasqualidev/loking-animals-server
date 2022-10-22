// LIBS
import { Router } from 'express';

// MIDDLEWARES
import { authMiddleware } from '../../middlewares/auth';

// CHIELD ROUTES
import { authRouter } from './auth/auth.routes';
import { userRouter } from './user/user.routes';
import { animalRouter } from './animal/animals.routes';

// ROUTES
export const backofficeRouter: Router = Router();

backofficeRouter.use('/auth', authRouter);
backofficeRouter.use('/users', authMiddleware, userRouter);
// backofficeRouter.use('/animals', authMiddleware, animalRouter);
backofficeRouter.use('/animals', animalRouter);
