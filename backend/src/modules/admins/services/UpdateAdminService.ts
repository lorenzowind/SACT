import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';

import Admin from '../infra/typeorm/entities/Admin';
import IUpdateAdminDTO from '../dtos/ICreateOrUpdateAdminDTO';

interface IRequest extends IUpdateAdminDTO {
  id: string;
}

@injectable()
class UpdateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    ra,
    email,
    password,
  }: IRequest): Promise<Admin> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    const adminWithUpdatedRa = await this.adminsRepository.findByRa(ra);

    if (adminWithUpdatedRa && adminWithUpdatedRa.id !== id) {
      throw new AppError('RA already in use.');
    }

    const adminWithUpdatedEmail = await this.adminsRepository.findByEmail(
      email,
    );

    if (adminWithUpdatedEmail && adminWithUpdatedEmail.id !== id) {
      throw new AppError('Email already in use.');
    }

    admin.name = name;
    admin.ra = ra;
    admin.email = email;

    admin.password = await this.hashProvider.generateHash(password);

    await this.cacheProvider.invalidatePrefix('admins-list');

    return this.adminsRepository.save(admin);
  }
}

export default UpdateAdminService;
