// LIBS
import { Router } from 'express';
import { backofficeRouter } from './backoffice/backoffice.routes';

// ROUTES
export const routes: Router = Router();

routes.use('/backoffice', backofficeRouter);
