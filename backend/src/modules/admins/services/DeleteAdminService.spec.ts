import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';

import DeleteAdminService from './DeleteAdminService';

let draftAdminsRepository: DraftAdminsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteAdmin: DeleteAdminService;

describe('DeleteAdmin', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteAdmin = new DeleteAdminService(
      draftAdminsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing admin', async () => {
    await expect(
      deleteAdmin.execute('Non existing admin id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an admin', async () => {
    await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const admin = await draftAdminsRepository.create({
      name: 'John Doe II',
      ra: '222222',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await deleteAdmin.execute(admin.id);

    expect(await draftAdminsRepository.findById(admin.id)).toBe(undefined);
  });
});
