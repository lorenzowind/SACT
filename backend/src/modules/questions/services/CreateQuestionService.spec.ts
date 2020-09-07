import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import CreateQuestionService from './CreateQuestionService';

let draftQuestionsRepository: DraftQuestionsRepository;

let draftCacheProvider: DraftCacheProvider;

let createQuestion: CreateQuestionService;

describe('CreateQuestion', () => {
  beforeEach(() => {
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createQuestion = new CreateQuestionService(
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new question', async () => {
    const question = await createQuestion.execute({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    expect(question).toHaveProperty('id');
  });
});
