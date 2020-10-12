import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';

import Admin from '../infra/typeorm/entities/Admin';

import ICreateAdminDTO from '../dtos/ICreateOrUpdateAdminDTO';

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    ra,
    email,
    password,
  }: ICreateAdminDTO): Promise<Admin> {
    const checkAdminRaExists = await this.adminsRepository.findByRa(ra);

    if (checkAdminRaExists) {
      throw new AppError('RA already used.');
    }

    const checkAdminEmailExists = await this.adminsRepository.findByEmail(
      email,
    );

    if (checkAdminEmailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const admin = await this.adminsRepository.create({
      name,
      ra,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('admins-list');

    return admin;
  }
}

export default CreateAdminService;
