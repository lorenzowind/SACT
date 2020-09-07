import Admin from '../infra/typeorm/entities/Admin';

import ICreateAdmin from '../dtos/ICreateOrUpdateAdminDTO';

export default interface IAdminsRepository {
  findAllAdmins(search: string, page: number): Promise<Admin[]>;
  findById(id: string): Promise<Admin | undefined>;
  findByEmail(email: string): Promise<Admin | undefined>;
  create(data: ICreateAdmin): Promise<Admin>;
  save(admin: Admin): Promise<Admin>;
  remove(admin: Admin): Promise<void>;
}
