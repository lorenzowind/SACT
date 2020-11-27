import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ReportsController from '../controllers/ReportsController';

const reportsRouter = Router();

const reportsController = new ReportsController();

reportsRouter.get('/general', ensureAuthenticated, reportsController.general);

reportsRouter.get('/course', ensureAuthenticated, reportsController.course);

export default reportsRouter;
