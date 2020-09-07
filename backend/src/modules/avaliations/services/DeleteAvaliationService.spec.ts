import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import DeleteAvaliationService from './DeleteAvaliationService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let deleteAvaliation: DeleteAvaliationService;

describe('DeleteAvaliation', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    deleteAvaliation = new DeleteAvaliationService(draftAvaliationsRepository);
  });

  it('should not be able to delete a non existing avaliation', async () => {
    await expect(
      deleteAvaliation.execute('Non existing avaliation id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an avaliation', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    await deleteAvaliation.execute(avaliation.id);

    expect(await draftAvaliationsRepository.findById(avaliation.id)).toBe(
      undefined,
    );
  });
});
