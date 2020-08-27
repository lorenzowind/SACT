import AdminToken from '../infra/typeorm/entities/AdminToken';

export default interface IAdminTokensRepository {
  generate(admin_id: string): Promise<AdminToken>;
  findByToken(token: string): Promise<AdminToken | undefined>;
}
