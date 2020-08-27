import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAdminsRepository from '../repositories/IAdminsRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    await this.adminsRepository.remove(admin);
  }
}

export default DeleteAdminService;
