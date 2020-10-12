import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import CreateAvaliationsService from './CreateAvaliationsService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let createAvaliations: CreateAvaliationsService;

describe('CreateAvaliations', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    createAvaliations = new CreateAvaliationsService(
      draftAvaliationsRepository,
      draftEvaluatorsRepository,
      draftProjectsRepository,
    );
  });

  it('should be able to create new avaliations', async () => {
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

    const avaliations = await createAvaliations.execute({
      evaluator_id: evaluator.id,
      projects: [
        {
          project_id: firstProject.id,
        },
        {
          project_id: secondProject.id,
        },
      ],
    });

    expect(avaliations).toHaveLength(2);
  });

  it('should not be able to create a new avaliation with non existing evaluator', async () => {
    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await expect(
      createAvaliations.execute({
        evaluator_id: 'non existing teacher id',
        projects: [
          {
            project_id: project.id,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new avaliation with non existing project', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    await expect(
      createAvaliations.execute({
        evaluator_id: evaluator.id,
        projects: [
          {
            project_id: 'non existing project id',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
