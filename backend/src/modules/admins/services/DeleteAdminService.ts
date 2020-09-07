import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    await this.adminsRepository.remove(admin);

    await this.cacheProvider.invalidatePrefix('admins-list');
  }
}

export default DeleteAdminService;
