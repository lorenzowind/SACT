import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import GradesController from '../controllers/GradesController';

const gradesRouter = Router();

const gradesController = new GradesController();

gradesRouter.get('/:avaliation_id', ensureAuthenticated, gradesController.show);

gradesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      grades: Joi.array().items(
        Joi.object({
          avaliation_id: Joi.string().required(),
          question_id: Joi.string().required(),
          grade: Joi.number().precision(1),
        }),
      ),
    },
  }),
  gradesController.create,
);

gradesRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      grades: Joi.array().items(
        Joi.object({
          grade_id: Joi.string().required(),
          avaliation_id: Joi.string().required(),
          question_id: Joi.string().required(),
          grade: Joi.number().precision(1),
        }),
      ),
    },
  }),
  gradesController.update,
);

gradesRouter.delete('/:id', ensureAuthenticated, gradesController.delete);

export default gradesRouter;
