import AppError from '@shared/errors/AppError';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import AuthenticateAdminService from './AuthenticateAdminService';

let draftAdminsRepository: DraftAdminsRepository;

let draftHashProvider: DraftHashProvider;

let authenticateAdmin: AuthenticateAdminService;

describe('AuthenticateAdmin', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();
    draftHashProvider = new DraftHashProvider();

    authenticateAdmin = new AuthenticateAdminService(
      draftAdminsRepository,
      draftHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateAdmin.execute({
      ra: '111111',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.admin).toEqual(admin);
  });

  it('should not be able to authenticate with non existing admin', async () => {
    await expect(
      authenticateAdmin.execute({
        ra: '111111',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateAdmin.execute({
        ra: '111111',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
