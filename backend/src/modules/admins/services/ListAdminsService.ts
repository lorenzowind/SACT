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

  public async execute(
    search: string,
    page: number,
    admin_id: string,
  ): Promise<Admin[]> {
    let admins = !search
      ? await this.cacheProvider.recover<Admin[]>(
          `admins-list:${admin_id}:page=${page}`,
        )
      : null;

    if (!admins) {
      admins = await this.adminsRepository.findAllAdmins(
        search,
        page > 0 ? page : 1,
      );

      const adminsPreviousPage = !search
        ? await this.cacheProvider.recover<Admin[]>(
            `admins-list:${admin_id}:page=${page - 1}`,
          )
        : null;

      if (adminsPreviousPage) {
        admins = adminsPreviousPage.concat(admins);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `admins-list:${admin_id}:page=${page}`,
          admins,
        );
      }
    }

    return admins;
  }
}

export default ListAdminsService;
