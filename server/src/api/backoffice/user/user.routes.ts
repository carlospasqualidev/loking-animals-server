// LIBS
import { Router } from 'express';

// VALIDATORS
import { isBackoffice } from '../../../middlewares/permissions/isBackoffice';

// FUNCTIONS
import { createUser } from './controllers/createUser';
import { listUsers } from './controllers/listUsers';
import { editUser } from './controllers/editUser';
import { changeIsBlocked } from './controllers/changeIsBlocked';
import { changeIsDeleted } from './controllers/changeIsDeleted';

// ROUTES
export const userRouter = Router();

userRouter.post('/create', isBackoffice, createUser);
userRouter.get('/list', isBackoffice, listUsers);
userRouter.put('/edit', isBackoffice, editUser);
userRouter.put('/change/isBlocked', isBackoffice, changeIsBlocked);
userRouter.put('/change/isDeleted', isBackoffice, changeIsDeleted);
