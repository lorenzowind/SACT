import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    if (project.image) {
      await this.storageProvider.deleteFile(project.image);
    }

    await this.projectsRepository.remove(project);

    await this.cacheProvider.invalidatePrefix('projects-list');
  }
}

export default DeleteProjectService;
