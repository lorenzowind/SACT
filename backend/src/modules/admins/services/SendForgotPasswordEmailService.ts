import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';
import IAdminTokensRepository from '../repositories/IAdminTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('AdminTokensRepository')
    private adminTokensRepository: IAdminTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) {
      throw new AppError('Admin does not exist.');
    }

    const { token } = await this.adminTokensRepository.generate(admin.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: admin.name,
        email: admin.email,
      },
      subject: '[SACT] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: admin.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
