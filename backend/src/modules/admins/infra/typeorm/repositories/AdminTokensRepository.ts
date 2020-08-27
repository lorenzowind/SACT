import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IAdminTokensRepository from '@modules/admins/repositories/IAdminTokensRepository';

import AdminToken from '../entities/AdminToken';

class AdminTokensRepository implements IAdminTokensRepository {
  private ormRepository: Repository<AdminToken>;

  constructor() {
    this.ormRepository = getRepository(AdminToken);
  }

  public async generate(admin_id: string): Promise<AdminToken> {
    const adminToken = this.ormRepository.create({
      admin_id,
    });

    Object.assign(adminToken, { id: v4(), token: v4() });

    await this.ormRepository.save(adminToken);

    return adminToken;
  }

  public async findByToken(token: string): Promise<AdminToken | undefined> {
    const adminToken = await this.ormRepository.findOne({
      where: { token },
    });

    return adminToken;
  }
}

export default AdminTokensRepository;
