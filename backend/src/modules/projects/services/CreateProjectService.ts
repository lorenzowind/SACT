import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

import ICreateProjectDTO from '../dtos/ICreateOrUpdateProjectDTO';

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    occupation_area,
    classroom,
    members,
    observation,
  }: ICreateProjectDTO): Promise<Project> {
    const checkProjectNameExists = await this.projectsRepository.findByName(
      name,
    );

    if (checkProjectNameExists) {
      throw new AppError('Project name already used.');
    }

    const project = await this.projectsRepository.create({
      name,
      occupation_area,
      classroom,
      members,
      observation,
    });

    await this.cacheProvider.invalidatePrefix('projects-list');

    return project;
  }
}

export default CreateProjectService;
