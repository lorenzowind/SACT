import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftEvaluatorsRepository from '../repositories/drafts/DraftEvaluatorsRepository';

import DeleteEvaluatorService from './DeleteEvaluatorService';

let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteEvaluator: DeleteEvaluatorService;

describe('DeleteEvaluator', () => {
  beforeEach(() => {
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteEvaluator = new DeleteEvaluatorService(
      draftEvaluatorsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing evaluator', async () => {
    await expect(
      deleteEvaluator.execute('Non existing evaluator id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an evaluator', async () => {
    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    await deleteEvaluator.execute(evaluator.id);

    expect(await draftEvaluatorsRepository.findById(evaluator.id)).toBe(
      undefined,
    );
  });
});
