import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftEvaluatorsRepository from '../repositories/drafts/DraftEvaluatorsRepository';

import CreateEvaluatorService from './CreateEvaluatorService';

let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let draftCacheProvider: DraftCacheProvider;

let createEvaluator: CreateEvaluatorService;

describe('CreateEvaluator', () => {
  beforeEach(() => {
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createEvaluator = new CreateEvaluatorService(
      draftEvaluatorsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new evaluator', async () => {
    const evaluator = await createEvaluator.execute({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    expect(evaluator).toHaveProperty('id');
  });

  it('should not be able to create a new evaluator with the same email from another', async () => {
    await createEvaluator.execute({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    await expect(
      createEvaluator.execute({
        name: 'John Doe II',
        email: 'evaluator@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
