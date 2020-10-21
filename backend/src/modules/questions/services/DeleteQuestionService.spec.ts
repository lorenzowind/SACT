import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import DeleteQuestionService from './DeleteQuestionService';

let draftQuestionsRepository: DraftQuestionsRepository;

let draftCacheProvider: DraftCacheProvider;

let deleteQuestion: DeleteQuestionService;

describe('DeleteQuestion', () => {
  beforeEach(() => {
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteQuestion = new DeleteQuestionService(
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing question', async () => {
    await expect(
      deleteQuestion.execute('Non existing question id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a question', async () => {
    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    const question = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
      min_grade: 6,
      max_grade: 10,
    });

    await deleteQuestion.execute(question.id);

    expect(await draftQuestionsRepository.findById(question.id)).toBe(
      undefined,
    );
  });
});
