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

  public async execute(
    search: string,
    page: number,
    admin_id: string,
  ): Promise<Project[]> {
    let projects = !search
      ? await this.cacheProvider.recover<Project[]>(
          `projects-list:${admin_id}:page=${page}`,
        )
      : null;

    if (!projects) {
      projects = await this.projectsRepository.findAllProjects(
        search,
        page > 0 ? page : 1,
      );

      const projectsPreviousPage = !search
        ? await this.cacheProvider.recover<Project[]>(
            `projects-list:${admin_id}:page=${page - 1}`,
          )
        : null;

      if (projectsPreviousPage) {
        projects = projectsPreviousPage.concat(projects);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `projects-list:${admin_id}:page=${page}`,
          projects,
        );
      }
    }

    return projects;
  }
}

export default ListProjectsService;
