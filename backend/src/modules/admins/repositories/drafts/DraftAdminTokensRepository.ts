import { v4 } from 'uuid';

import AdminToken from '@modules/admins/infra/typeorm/entities/AdminToken';

import IAdminTokensRepository from '../IAdminTokensRepository';

export default class DraftAdminTokensRepository
  implements IAdminTokensRepository {
  private adminTokens: AdminToken[] = [];

  public async generate(admin_id: string): Promise<AdminToken> {
    const adminToken = new AdminToken();

    Object.assign(adminToken, {
      id: v4(),
      token: v4(),
      admin_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.adminTokens.push(adminToken);

    return adminToken;
  }

  public async findByToken(token: string): Promise<AdminToken | undefined> {
    const adminToken = this.adminTokens.find(
      findToken => findToken.token === token,
    );

    return adminToken;
  }
}
