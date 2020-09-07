import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftProjectsRepository from '../repositories/drafts/DraftProjectsRepository';

import UpdateProjectService from './UpdateProjectService';

let draftProjectsRepository: DraftProjectsRepository;

let draftCacheProvider: DraftCacheProvider;

let updateProject: UpdateProjectService;

describe('UpdateProject', () => {
  beforeEach(() => {
    draftProjectsRepository = new DraftProjectsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateProject = new UpdateProjectService(
      draftProjectsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the project', async () => {
    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const updatedProject = await updateProject.execute({
      id: project.id,
      name: 'Project Name II',
      occupation_area: 'Occupation Area',
    });

    expect(updatedProject.name).toBe('Project Name II');
    expect(updatedProject.occupation_area).toBe('Occupation Area');
  });

  it('should not be able to update from a non existing project', async () => {
    expect(
      updateProject.execute({
        id: 'non existing project id',
        name: 'Project Name II',
        occupation_area: 'Occupation Area',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another project name', async () => {
    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    await expect(
      updateProject.execute({
        id: project.id,
        name: 'Project Name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
