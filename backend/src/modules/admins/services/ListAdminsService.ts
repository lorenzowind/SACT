import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Admin from '../infra/typeorm/entities/Admin';

import IAdminsRepository from '../repositories/IAdminsRepository';

@injectable()
class ListAdminsService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(search: string, admin_id: string): Promise<Admin[]> {
    let admins = !search
      ? await this.cacheProvider.recover<Admin[]>(`admins-list:${admin_id}`)
      : null;

    if (!admins) {
      admins = await this.adminsRepository.findAllAdmins(search);

      if (!search) {
        await this.cacheProvider.save(`admins-list:${admin_id}`, admins);
      }
    }

    return admins;
  }
}

export default ListAdminsService;
