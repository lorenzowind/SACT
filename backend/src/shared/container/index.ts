import { container } from 'tsyringe';

import './providers/index';
import '@modules/admins/providers/index';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admins/infra/typeorm/repositories/AdminsRepository';

import IAdminTokensRepository from '@modules/admins/repositories/IAdminTokensRepository';
import AdminTokensRepository from '@modules/admins/infra/typeorm/repositories/AdminTokensRepository';

import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import EvaluatorsRepository from '@modules/evaluators/infra/typeorm/repositories/EvaluatorsRepository';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import QuestionsRepository from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import AvaliationsRepository from '@modules/avaliations/infra/typeorm/repositories/AvaliationsRepository';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import GradesRepository from '@modules/grades/infra/typeorm/repositories/GradesRepository';

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository,
);

container.registerSingleton<IAdminTokensRepository>(
  'AdminTokensRepository',
  AdminTokensRepository,
);

container.registerSingleton<IEvaluatorsRepository>(
  'EvaluatorsRepository',
  EvaluatorsRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository,
);

container.registerSingleton<IAvaliationsRepository>(
  'AvaliationsRepository',
  AvaliationsRepository,
);

container.registerSingleton<IGradesRepository>(
  'GradesRepository',
  GradesRepository,
);
