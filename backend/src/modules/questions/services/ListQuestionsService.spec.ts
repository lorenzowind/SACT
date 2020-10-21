import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftAdminsRepository from '@modules/admins/repositories/drafts/DraftAdminsRepository';
import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import ListQuestionsService from './ListQuestionsService';

let draftAdminsRepository: DraftAdminsRepository;
let draftQuestionsRepository: DraftQuestionsRepository;

let draftCacheProvider: DraftCacheProvider;

let listQuestions: ListQuestionsService;

describe('ListQuestions', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listQuestions = new ListQuestionsService(
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the questions from the first page', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
      min_grade: 6,
      max_grade: 10,
    });

    const response = await listQuestions.execute('', admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to return the same questions if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    await listQuestions.execute('', admin.id);

    const response = await listQuestions.execute('', admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to list all the questions from the first page which includes a search string', async () => {
    const questionSearch = 'Question Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name III',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: questionSearch,
      criterion: 'Criterion Name IV',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name',
      min_grade: 6,
      max_grade: 10,
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name II',
      min_grade: 6,
      max_grade: 10,
    });

    const response = await listQuestions.execute(questionSearch, admin.id);

    expect(response).toHaveLength(1);
  });
});
