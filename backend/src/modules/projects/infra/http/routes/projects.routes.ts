import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProjectsController from '../controllers/ProjectsController';
import ProjectImageController from '../controllers/ProjectImageController';

const projectsRouter = Router();

const upload = multer(uploadConfig.multer);

const projectsController = new ProjectsController();
const projectImageController = new ProjectImageController();

projectsRouter.get('/all', ensureAuthenticated, projectsController.show);

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      occupation_area: Joi.string(),
      classroom: Joi.string(),
      members: Joi.string(),
      observations: Joi.string(),
    },
  }),
  projectsController.create,
);

projectsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      occupation_area: Joi.string(),
      classroom: Joi.string(),
      members: Joi.string(),
      observations: Joi.string(),
    },
  }),
  projectsController.update,
);

projectsRouter.patch(
  '/:id/image',
  ensureAuthenticated,
  upload.single('image'),
  projectImageController.update,
);

projectsRouter.delete('/:id', ensureAuthenticated, projectsController.delete);

export default projectsRouter;
