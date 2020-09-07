import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import ListAvaliationsService from './ListAvaliationsService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let listAvaliations: ListAvaliationsService;

describe('ListAvaliations', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    listAvaliations = new ListAvaliationsService(
      draftAvaliationsRepository,
      draftEvaluatorsRepository,
    );
  });

  it('should be able to list all the avaliations', async () => {
    const firstEvaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    const secondEvaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
      status: 'to_evaluate',
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

    const response = await listAvaliations.execute(firstEvaluator.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list avaliations with non existing evaluator', async () => {
    await expect(
      listAvaliations.execute('non existing evaluator id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
