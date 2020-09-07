import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';

import CreateAdminService from './CreateAdminService';

let draftAdminsRepository: DraftAdminsRepository;

let draftCacheProvider: DraftCacheProvider;
let draftHashProvider: DraftHashProvider;

let createAdmin: CreateAdminService;

describe('CreateAdmin', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();

    draftHashProvider = new DraftHashProvider();
    draftCacheProvider = new DraftCacheProvider();

    createAdmin = new CreateAdminService(
      draftAdminsRepository,
      draftHashProvider,
      draftCacheProvider,
    );
  });

  it('should be able to create a new admin', async () => {
    const admin = await createAdmin.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(admin).toHaveProperty('id');
  });

  it('should not be able to create a new admin with the same email from another', async () => {
    await createAdmin.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createAdmin.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
