import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftProjectsRepository from '../repositories/drafts/DraftProjectsRepository';

import UpdateProjectImageService from './UpdateProjectImageService';

let draftProjectsRepository: DraftProjectsRepository;

let draftStorageProvider: DraftStorageProvider;

let updateProjectImage: UpdateProjectImageService;

describe('UpdateProjectImage', () => {
  beforeEach(() => {
    draftProjectsRepository = new DraftProjectsRepository();

    draftStorageProvider = new DraftStorageProvider();

    updateProjectImage = new UpdateProjectImageService(
      draftProjectsRepository,
      draftStorageProvider,
    );
  });

  it('should be able to update the project with an image', async () => {
    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await updateProjectImage.execute({
      project_id: project.id,
      imageFilename: 'avatar.jpg',
    });

    expect(project.image).toBe('avatar.jpg');
  });

  it('should not be able to update the image from non existing project', async () => {
    await expect(
      updateProjectImage.execute({
        project_id: 'non existing project id',
        imageFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old image when updating new one', async () => {
    const deleteFile = jest.spyOn(draftStorageProvider, 'deleteFile');

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await updateProjectImage.execute({
      project_id: project.id,
      imageFilename: 'avatar.jpg',
    });

    await updateProjectImage.execute({
      project_id: project.id,
      imageFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(project.image).toBe('avatar2.jpg');
  });
});
