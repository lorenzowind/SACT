import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftAdminsRepository from '@modules/admins/repositories/drafts/DraftAdminsRepository';
import DraftEvaluatorsRepository from '../repositories/drafts/DraftEvaluatorsRepository';

import ListEvaluatorsService from './ListEvaluatorsService';

let draftAdminsRepository: DraftAdminsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let draftCacheProvider: DraftCacheProvider;

let listEvaluators: ListEvaluatorsService;

describe('ListEvaluators', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listEvaluators = new ListEvaluatorsService(
      draftEvaluatorsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the evaluators from the first page', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    const response = await listEvaluators.execute('', admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to return the same evaluators if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    await listEvaluators.execute('', admin.id);

    const response = await listEvaluators.execute('', admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to list all the evaluators who includes a search string', async () => {
    const evaluatorSearch = 'Evaluator Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      email: 'evaluatorII@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe III',
      email: 'evaluatorIII@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: evaluatorSearch,
      email: 'evaluatorIV@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe V',
      email: 'evaluatorV@email.com',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe VI',
      email: 'evaluatorVI@email.com',
    });

    const response = await listEvaluators.execute(evaluatorSearch, admin.id);

    expect(response).toHaveLength(1);
  });
});
