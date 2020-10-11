import AppError from '@shared/errors/AppError';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';
import DraftAdminTokensRepository from '../repositories/drafts/DraftAdminTokensRepository';

import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import ResetPasswordService from './ResetPasswordService';

let draftAdminsRepository: DraftAdminsRepository;
let draftAdminTokensRepository: DraftAdminTokensRepository;

let draftHashProvider: DraftHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();
    draftAdminTokensRepository = new DraftAdminTokensRepository();

    draftHashProvider = new DraftHashProvider();

    resetPassword = new ResetPasswordService(
      draftAdminsRepository,
      draftAdminTokensRepository,
      draftHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await draftAdminTokensRepository.generate(admin.id);

    const generateHash = jest.spyOn(draftHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '123123',
    });

    const updatedAdmin = await draftAdminsRepository.findById(admin.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedAdmin?.password).toBe('123123');
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non existing token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing admin', async () => {
    const { token } = await draftAdminTokensRepository.generate(
      'non existing admin',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await draftAdminTokensRepository.generate(admin.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
