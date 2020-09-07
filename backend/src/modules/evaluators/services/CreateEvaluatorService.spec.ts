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
      cpf: 'evaluator CPF',
    });

    expect(evaluator).toHaveProperty('id');
  });

  it('should not be able to create a new evaluator with the same CPF from another', async () => {
    await createEvaluator.execute({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    await expect(
      createEvaluator.execute({
        name: 'John Doe II',
        cpf: 'evaluator CPF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
