import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftEvaluatorsRepository from '../repositories/drafts/DraftEvaluatorsRepository';

import UpdateEvaluatorService from './UpdateEvaluatorService';

let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let draftCacheProvider: DraftCacheProvider;

let updateEvaluator: UpdateEvaluatorService;

describe('UpdateEvaluator', () => {
  beforeEach(() => {
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateEvaluator = new UpdateEvaluatorService(
      draftEvaluatorsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the evaluator', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    const updatedEvaluator = await updateEvaluator.execute({
      id: evaluator.id,
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
    });

    expect(updatedEvaluator.name).toBe('John Doe II');
    expect(updatedEvaluator.cpf).toBe('evaluator CPF II');
  });

  it('should not be able to update from a non existing evaluator', async () => {
    expect(
      updateEvaluator.execute({
        id: 'non existing evaluator',
        name: 'John Doe',
        cpf: 'evaluator CPF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another evaluator CPF', async () => {
    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
    });

    await expect(
      updateEvaluator.execute({
        id: evaluator.id,
        name: evaluator.name,
        cpf: 'evaluator CPF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
