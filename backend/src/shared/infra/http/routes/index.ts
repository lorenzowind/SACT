import { Router } from 'express';

import adminsRouter from '@modules/admins/infra/http/routes/admins.routes';
import sessionsRouter from '@modules/admins/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/admins/infra/http/routes/password.routes';

const routes = Router();

routes.use('/admins', adminsRouter);
routes.use('/admins/sessions', sessionsRouter);
routes.use('/admins/password', passwordRouter);

export default routes;
