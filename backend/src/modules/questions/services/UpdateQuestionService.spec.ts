import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import UpdateQuestionService from './UpdateQuestionService';

let draftQuestionsRepository: DraftQuestionsRepository;

let draftCacheProvider: DraftCacheProvider;

let updateQuestion: UpdateQuestionService;

describe('UpdateQuestion', () => {
  beforeEach(() => {
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateQuestion = new UpdateQuestionService(
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the question', async () => {
    const question = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    const updatedQuestion = await updateQuestion.execute({
      id: question.id,
      section: 'Section Name II',
      criterion: 'Criterion Name II',
      min_grade: 6,
      max_grade: 10,
    });

    expect(updatedQuestion.section).toBe('Section Name II');
    expect(updatedQuestion.criterion).toBe('Criterion Name II');
  });

  it('should not be able to update from a non existing question', async () => {
    expect(
      updateQuestion.execute({
        id: 'non existing question id',
        section: 'Section Name II',
        criterion: 'Criterion Name II',
        min_grade: 6,
        max_grade: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
