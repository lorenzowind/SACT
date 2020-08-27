import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IAdminsRepository from '../repositories/IAdminsRepository';
import IAdminTokensRepository from '../repositories/IAdminTokensRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('AdminTokensRepository')
    private adminTokensRepository: IAdminTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const adminToken = await this.adminTokensRepository.findByToken(token);

    if (!adminToken) {
      throw new AppError('Admin token does not exists.');
    }

    const admin = await this.adminsRepository.findById(adminToken.admin_id);

    if (!admin) {
      throw new AppError('Admin does not exists.');
    }

    const tokenCreatedAt = adminToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired.');
    }

    admin.password = await this.hashProvider.generateHash(password);

    await this.adminsRepository.save(admin);
  }
}

export default ResetPasswordService;
