import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftProjectsRepository from '../repositories/drafts/DraftProjectsRepository';

import CreateProjectService from './CreateProjectService';

let draftProjectsRepository: DraftProjectsRepository;

let draftCacheProvider: DraftCacheProvider;

let createProject: CreateProjectService;

describe('CreateProject', () => {
  beforeEach(() => {
    draftProjectsRepository = new DraftProjectsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createProject = new CreateProjectService(
      draftProjectsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new project', async () => {
    const project = await createProject.execute({
      name: 'Project Name',
    });

    expect(project).toHaveProperty('id');
  });

  it('should not be able to create a new project with the same Name from another', async () => {
    await createProject.execute({
      name: 'Project Name',
    });

    await expect(
      createProject.execute({
        name: 'Project Name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
