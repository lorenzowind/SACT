import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import UpdateAvaliationService from './UpdateAvaliationService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let updateAvaliation: UpdateAvaliationService;

describe('UpdateAvaliation', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    updateAvaliation = new UpdateAvaliationService(
      draftAvaliationsRepository,
      draftEvaluatorsRepository,
      draftProjectsRepository,
    );
  });

  it('should be able to update an avaliation', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const firstProject = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const secondProject = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: firstProject.id,
    });

    const updatedAvaliation = await updateAvaliation.execute({
      id: avaliation.id,
      evaluator_id: avaliation.evaluator_id,
      project_id: secondProject.id,
    });

    expect(updatedAvaliation.project_id).toBe(secondProject.id);
  });

  it('should not be able to update from a non existing avaliation', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await expect(
      updateAvaliation.execute({
        id: 'non existing avaliation id',
        evaluator_id: evaluator.id,
        project_id: project.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointment with non existing evaluator', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    await expect(
      updateAvaliation.execute({
        id: avaliation.id,
        evaluator_id: 'non existing evaluator id',
        project_id: avaliation.project_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointment with non existing project', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    await expect(
      updateAvaliation.execute({
        id: avaliation.id,
        evaluator_id: avaliation.evaluator_id,
        project_id: 'non existing project id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
