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
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
    });

    const response = await listQuestions.execute('', 1, admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    const response = await listQuestions.execute('', -1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list questions from the second page without accumulate the first one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    const response = await listQuestions.execute('', 2, admin.id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same questions if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await listQuestions.execute('', 1, admin.id);

    const response = await listQuestions.execute('', 1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate questions from the first page on the second one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await listQuestions.execute('', 1, admin.id);

    const response = await listQuestions.execute('', 2, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the questions', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name III',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name IV',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name II',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name III',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name IV',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name III',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name III',
      criterion: 'Criterion Name II',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name III',
      criterion: 'Criterion Name III',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name III',
      criterion: 'Criterion Name IV',
    });

    await listQuestions.execute('', 1, admin.id);

    const response = await listQuestions.execute('', 2, admin.id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the questions from the first page which includes a search string', async () => {
    const questionSearch = 'Question Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name III',
    });

    await draftQuestionsRepository.create({
      section: questionSearch,
      criterion: 'Criterion Name IV',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name',
    });

    await draftQuestionsRepository.create({
      section: 'Section Name II',
      criterion: 'Criterion Name II',
    });

    const response = await listQuestions.execute(questionSearch, 1, admin.id);

    expect(response).toHaveLength(1);
  });
});
