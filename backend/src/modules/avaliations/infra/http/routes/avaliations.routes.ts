import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AvaliationsController from '../controllers/AvaliationsController';

const avaliationsRouter = Router();

const avaliationsController = new AvaliationsController();

avaliationsRouter.get('/all', ensureAuthenticated, avaliationsController.show);

avaliationsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      evaluator_id: Joi.string().required(),
      project_id: Joi.string().required(),
    },
  }),
  avaliationsController.create,
);

avaliationsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      evaluator_id: Joi.string().required(),
      project_id: Joi.string().required(),
    },
  }),
  avaliationsController.update,
);

avaliationsRouter.delete(
  '/:id',
  ensureAuthenticated,
  avaliationsController.delete,
);

export default avaliationsRouter;
