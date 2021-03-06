import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import EvaluatorsController from '../controllers/EvaluatorsController';

const evaluatorsRouter = Router();

const evaluatorsController = new EvaluatorsController();

evaluatorsRouter.get('/all', ensureAuthenticated, evaluatorsController.show);

evaluatorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      occupation_area: Joi.string(),
      institution: Joi.string(),
      phone_number: Joi.string(),
      email: Joi.string(),
    },
  }),
  evaluatorsController.create,
);

evaluatorsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      occupation_area: Joi.string(),
      institution: Joi.string(),
      phone_number: Joi.string(),
      email: Joi.string(),
    },
  }),
  evaluatorsController.update,
);

evaluatorsRouter.delete(
  '/:id',
  ensureAuthenticated,
  evaluatorsController.delete,
);

export default evaluatorsRouter;
