import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Project from '../infra/typeorm/entities/Project';

import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(search: string, admin_id: string): Promise<Project[]> {
    let projects = !search
      ? await this.cacheProvider.recover<Project[]>(`projects-list:${admin_id}`)
      : null;

    if (!projects) {
      projects = await this.projectsRepository.findAllProjects(search);

      if (!search) {
        await this.cacheProvider.save(`projects-list:${admin_id}`, projects);
      }
    }

    return projects;
  }
}

export default ListProjectsService;
