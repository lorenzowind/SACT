import { v4 } from 'uuid';

import ICreateUserDTO from '@modules/admins/dtos/ICreateOrUpdateAdminDTO';

import Admin from '@modules/admins/infra/typeorm/entities/Admin';

import IAdminsRepository from '../IAdminsRepository';

export default class DraftAdminsRepository implements IAdminsRepository {
  private admins: Admin[] = [];

  public async findById(id: string): Promise<Admin | undefined> {
    const admin = this.admins.find(findAdmin => findAdmin.id === id);

    return admin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const admin = this.admins.find(findAdmin => findAdmin.email === email);

    return admin;
  }

  public async create(adminData: ICreateUserDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, { id: v4() }, adminData);

    this.admins.push(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    const findIndex = this.admins.findIndex(
      findAdmin => findAdmin.id === admin.id,
    );

    this.admins[findIndex] = admin;

    return admin;
  }

  public async remove(admin: Admin): Promise<void> {
    const findIndex = this.admins.findIndex(
      findAdmin => findAdmin.id === admin.id,
    );

    this.admins.splice(findIndex, 1);
  }
}
