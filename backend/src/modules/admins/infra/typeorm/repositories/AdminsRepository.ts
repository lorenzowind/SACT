import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';

import ICreateAdminDTO from '@modules/admins/dtos/ICreateOrUpdateAdminDTO';

import Admin from '../entities/Admin';

class AdminsRepository implements IAdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async findAllAdmins(search: string): Promise<Admin[]> {
    const admins =
      search !== ''
        ? await this.ormRepository.find({
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find();

    return admins;
  }

  public async findById(id: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne(id);

    return findAdmin;
  }

  public async findByRa(ra: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne({ where: { ra } });

    return findAdmin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const findAdmin = await this.ormRepository.findOne({ where: { email } });

    return findAdmin;
  }

  public async create(adminData: ICreateAdminDTO): Promise<Admin> {
    const admin = this.ormRepository.create(adminData);

    Object.assign(admin, { id: v4() });

    await this.ormRepository.save(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    return this.ormRepository.save(admin);
  }

  public async remove(admin: Admin): Promise<void> {
    await this.ormRepository.remove(admin);
  }
}

export default AdminsRepository;
