import { Router } from 'express';

import adminsRouter from '@modules/admins/infra/http/routes/admins.routes';
import adminsSessionsRouter from '@modules/admins/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/admins/infra/http/routes/password.routes';

import evaluatorsRouter from '@modules/evaluators/infra/http/routes/evaluators.routes';
import evaluatorsSessionsRouter from '@modules/evaluators/infra/http/routes/sessions.routes';

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import questionsRouter from '@modules/questions/infra/http/routes/questions.routes';
import avaliationsRouter from '@modules/avaliations/infra/http/routes/avaliations.routes';
import gradesRouter from '@modules/grades/infra/http/routes/grades.routes';

const routes = Router();

routes.use('/admins', adminsRouter);
routes.use('/admins/sessions', adminsSessionsRouter);
routes.use('/admins/password', passwordRouter);

routes.use('/evaluators', evaluatorsRouter);
routes.use('/evaluators/sessions', evaluatorsSessionsRouter);

routes.use('/projects', projectsRouter);
routes.use('/questions', questionsRouter);
routes.use('/avaliations', avaliationsRouter);
routes.use('/grades', gradesRouter);

export default routes;
