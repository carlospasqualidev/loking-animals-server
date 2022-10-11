// LIBS
import { Router } from 'express';

// VALIDATORS
import { isAdmin } from '../../../middlewares/permissions/isBackoffice';

// FUNCTIONS
import { createUser } from './controllers/createUser';
import { listUsers } from './controllers/listUsers';
import { editUser } from './controllers/editUser';
import { changeIsBlocked } from './controllers/changeIsBlocked';
import { changeIsDeleted } from './controllers/changeIsDeleted';

// ROUTES
export const userRouter = Router();

userRouter.post('/create', isAdmin, createUser);
userRouter.get('/list', isAdmin, listUsers);
userRouter.put('/edit', isAdmin, editUser);
userRouter.put('/change/isBlocked', isAdmin, changeIsBlocked);
userRouter.put('/change/isDeleted', isAdmin, changeIsDeleted);
