import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateOrUpdateProjectDTO';

import Project from '../entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAllProjects(
    search: string,
    page: number,
  ): Promise<Project[]> {
    const projects =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return projects;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne(id);

    return findProject;
  }

  public async findByName(name: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { name },
    });

    return findProject;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectData);

    Object.assign(project, { id: v4() });

    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async remove(project: Project): Promise<void> {
    await this.ormRepository.remove(project);
  }
}

export default ProjectsRepository;
