import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

interface IRequest {
  project_id: string;
  imageFilename: string;
}

@injectable()
class UpdateProjectImageService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    project_id,
    imageFilename,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    if (project.image) {
      await this.storageProvider.deleteFile(project.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    project.image = fileName;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectImageService;
