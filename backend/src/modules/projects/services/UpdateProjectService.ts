import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

import IUpdateProjectDTO from '../dtos/ICreateOrUpdateProjectDTO';

interface IRequest extends IUpdateProjectDTO {
  id: string;
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    description,
    occupation_area,
    classroom,
    members,
    observations,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    const projectWithUpdatedName = await this.projectsRepository.findByName(
      name,
    );

    if (projectWithUpdatedName && projectWithUpdatedName.id !== id) {
      throw new AppError('Project name already in use.');
    }

    project.name = name;
    project.description = description;
    project.occupation_area = occupation_area;
    project.classroom = classroom;
    project.members = members;
    project.observations = observations;

    await this.cacheProvider.invalidatePrefix('projects-list');

    return this.projectsRepository.save(project);
  }
}

export default UpdateProjectService;
