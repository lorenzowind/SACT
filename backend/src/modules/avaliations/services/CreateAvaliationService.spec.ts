import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import CreateAvaliationService from './CreateAvaliationService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let createAvaliation: CreateAvaliationService;

describe('CreateAvaliation', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    createAvaliation = new CreateAvaliationService(
      draftAvaliationsRepository,
      draftEvaluatorsRepository,
      draftProjectsRepository,
    );
  });

  it('should be able to create a new avaliation', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await createAvaliation.execute({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    expect(avaliation).toHaveProperty('id');
  });

  it('should not be able to create a new avaliation with non existing evaluator', async () => {
    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await expect(
      createAvaliation.execute({
        evaluator_id: 'non existing teacher id',
        project_id: project.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new avaliation with non existing project', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    await expect(
      createAvaliation.execute({
        evaluator_id: evaluator.id,
        project_id: 'non existing project id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
