import Project from '../infra/typeorm/entities/Project';

import ICreateProjectDTO from '../dtos/ICreateOrUpdateProjectDTO';

export default interface IProjectsRepository {
  findAllProjects(search: string, page: number): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  findByName(name: string): Promise<Project | undefined>;
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  remove(project: Project): Promise<void>;
}
