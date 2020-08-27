import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import Admin from '../infra/typeorm/entities/Admin';

import IAdminsRepository from '../repositories/IAdminsRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  admin: Admin;
  token: string;
}

@injectable()
class AuthenticateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) {
      throw new AppError('Incorrect login/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      admin.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect login/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: admin.id,
      expiresIn,
    });

    return {
      admin,
      token,
    };
  }
}

export default AuthenticateAdminService;
