import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();

const adminsController = new AdminsController();

adminsRouter.get('/all', ensureAuthenticated, adminsController.show);

adminsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  adminsController.create,
);

adminsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6),
    },
  }),
  adminsController.update,
);

adminsRouter.delete('/:id', ensureAuthenticated, adminsController.delete);

export default adminsRouter;
