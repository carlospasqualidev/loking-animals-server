// LIBS
import { Router } from 'express';

// MIDDLEWARES
import { authMiddleware } from '../../middlewares/auth';
import { uploadRouter } from '../shared/upload/upload.routes';

// CHIELD ROUTES
import { authRouter } from './auth/auth.routes';
import { userRouter } from './user/user.routes';

// ROUTES
export const backofficeRouter: Router = Router();

backofficeRouter.use('/auth', authRouter);
backofficeRouter.use('/users', authMiddleware, userRouter);

backofficeRouter.use('/upload', authMiddleware, uploadRouter);
