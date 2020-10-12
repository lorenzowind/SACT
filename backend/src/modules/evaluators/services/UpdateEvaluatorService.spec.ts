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
      email: 'evaluator@email.com',
    });

    const updatedEvaluator = await updateEvaluator.execute({
      id: evaluator.id,
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    expect(updatedEvaluator.name).toBe('John Doe II');
    expect(updatedEvaluator.email).toBe('evaluatorII@email.com');
  });

  it('should not be able to update from a non existing evaluator', async () => {
    expect(
      updateEvaluator.execute({
        id: 'non existing evaluator',
        name: 'John Doe',
        email: 'evaluator@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another evaluator email', async () => {
    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    await expect(
      updateEvaluator.execute({
        id: evaluator.id,
        name: evaluator.name,
        email: 'evaluator@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
