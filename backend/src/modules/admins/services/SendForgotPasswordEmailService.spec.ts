import AppError from '@shared/errors/AppError';

import DraftMailProvider from '@shared/container/providers/MailProvider/drafts/DraftMailProvider';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';
import DraftAdminTokensRepository from '../repositories/drafts/DraftAdminTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let draftMailProvider: DraftMailProvider;

let draftAdminsRepository: DraftAdminsRepository;
let draftAdminTokensRepository: DraftAdminTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    draftMailProvider = new DraftMailProvider();

    draftAdminsRepository = new DraftAdminsRepository();
    draftAdminTokensRepository = new DraftAdminTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      draftAdminsRepository,
      draftMailProvider,
      draftAdminTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(draftMailProvider, 'sendMail');

    await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing admin password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud generate a forgot password token', async () => {
    const generateToken = jest.spyOn(draftAdminTokensRepository, 'generate');

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(admin.id);
  });
});
