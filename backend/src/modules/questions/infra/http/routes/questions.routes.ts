import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();

const questionsController = new QuestionsController();

questionsRouter.get('/all', ensureAuthenticated, questionsController.show);

questionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      section: Joi.string().required(),
      criterion: Joi.string(),
    },
  }),
  questionsController.create,
);

questionsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      section: Joi.string().required(),
      criterion: Joi.string(),
    },
  }),
  questionsController.update,
);

questionsRouter.delete('/:id', ensureAuthenticated, questionsController.delete);

export default questionsRouter;