import { container } from 'tsyringe';

import './providers/index';
import '@modules/admins/providers/index';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admins/infra/typeorm/repositories/AdminsRepository';

import IAdminTokensRepository from '@modules/admins/repositories/IAdminTokensRepository';
import AdminTokensRepository from '@modules/admins/infra/typeorm/repositories/AdminTokensRepository';

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository,
);

container.registerSingleton<IAdminTokensRepository>(
  'AdminTokensRepository',
  AdminTokensRepository,
);
