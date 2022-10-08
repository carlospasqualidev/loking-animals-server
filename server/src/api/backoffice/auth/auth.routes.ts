// LIBS
import { Router } from 'express';

// FUNCTIONS
import { authAdmin } from './controllers/authAdmin';
import { authMiddleware } from '../../../middlewares/auth';
import { authValidateToken } from '../../shared/auth/controllers/authValidateToken';

// ROUTES
export const authRouter = Router();

authRouter.post('/login', authAdmin);
authRouter.get('/validate/token', authMiddleware, authValidateToken);
