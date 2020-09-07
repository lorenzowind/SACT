import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';

import UpdateAdminService from './UpdateAdminService';

let draftAdminsRepository: DraftAdminsRepository;

let draftHashProvider: DraftHashProvider;

let updateAdmin: UpdateAdminService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();

    draftHashProvider = new DraftHashProvider();

    updateAdmin = new UpdateAdminService(
      draftAdminsRepository,
      draftHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedAdmin = await updateAdmin.execute({
      id: admin.id,
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    expect(updatedAdmin.name).toBe('John Doe II');
    expect(updatedAdmin.email).toBe('johndoeII@example.com');
  });

  it('should not be able to update from a non existing admin', async () => {
    expect(
      updateAdmin.execute({
        id: 'non existing admin',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another admin email', async () => {
    await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const admin = await draftAdminsRepository.create({
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await expect(
      updateAdmin.execute({
        id: admin.id,
        name: admin.name,
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedAdmin = await updateAdmin.execute({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: '123123',
    });

    expect(updatedAdmin.password).toBe('123123');
  });
});