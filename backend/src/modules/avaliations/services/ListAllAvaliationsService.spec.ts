import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import ListAllAvaliationsService from './ListAllAvaliationsService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let listAllAvaliations: ListAllAvaliationsService;

describe('ListAllAvaliations', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    listAllAvaliations = new ListAllAvaliationsService(
      draftAvaliationsRepository,
    );
  });

  it('should be able to list all the avaliations', async () => {
    const firstEvaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const secondEvaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    const firstProject = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const secondProject = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    const thirdProject = await draftProjectsRepository.create({
      name: 'Project Name III',
    });

    await draftAvaliationsRepository.create({
      evaluator_id: firstEvaluator.id,
      project_id: firstProject.id,
    });

    await draftAvaliationsRepository.create({
      evaluator_id: firstEvaluator.id,
      project_id: secondProject.id,
    });

    await draftAvaliationsRepository.create({
      evaluator_id: secondEvaluator.id,
      project_id: firstProject.id,
    });

    await draftAvaliationsRepository.create({
      evaluator_id: secondEvaluator.id,
      project_id: secondProject.id,
    });

    await draftAvaliationsRepository.create({
      evaluator_id: secondEvaluator.id,
      project_id: thirdProject.id,
    });

    const response = await listAllAvaliations.execute();

    expect(response).toHaveLength(5);
  });
});
