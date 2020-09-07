import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';
import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftProjectsRepository from '../repositories/drafts/DraftProjectsRepository';

import DeleteProjectService from './DeleteProjectService';
import UpdateProjectImageService from './UpdateProjectImageService';

let draftProjectsRepository: DraftProjectsRepository;

let draftStorageProvider: DraftStorageProvider;
let draftCacheProvider: DraftCacheProvider;

let deleteProject: DeleteProjectService;
let updateProjectImage: UpdateProjectImageService;

describe('DeleteProject', () => {
  beforeEach(() => {
    draftProjectsRepository = new DraftProjectsRepository();

    draftCacheProvider = new DraftCacheProvider();
    draftStorageProvider = new DraftStorageProvider();

    deleteProject = new DeleteProjectService(
      draftProjectsRepository,
      draftCacheProvider,
      draftStorageProvider,
    );

    updateProjectImage = new UpdateProjectImageService(
      draftProjectsRepository,
      draftStorageProvider,
    );
  });

  it('should not be able to delete a non existing project', async () => {
    await expect(
      deleteProject.execute('Non existing project id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a project', async () => {
    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    await deleteProject.execute(project.id);

    expect(await draftProjectsRepository.findById(project.id)).toBe(undefined);
  });

  it('should be able to delete a project with its avatar', async () => {
    const deleteFile = jest.spyOn(draftStorageProvider, 'deleteFile');

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    await updateProjectImage.execute({
      project_id: project.id,
      imageFilename: 'avatar.jpg',
    });

    await deleteProject.execute(project.id);

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(await draftProjectsRepository.findById(project.id)).toBe(undefined);
  });
});
