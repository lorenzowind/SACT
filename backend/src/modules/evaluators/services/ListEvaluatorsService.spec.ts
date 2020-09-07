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
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
      status: 'to_evaluate',
    });

    const response = await listEvaluators.execute('', 1, admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    const response = await listEvaluators.execute('', -1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list evaluators from the second page without accumulate the first one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    const response = await listEvaluators.execute('', 2, admin.id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same evaluators if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    await listEvaluators.execute('', 1, admin.id);

    const response = await listEvaluators.execute('', 1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate evaluators from the first page on the second one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    await listEvaluators.execute('', 1, admin.id);

    const response = await listEvaluators.execute('', 2, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the evaluators', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe III',
      cpf: 'evaluator CPF III',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe IV',
      cpf: 'evaluator CPF IV',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe V',
      cpf: 'evaluator CPF V',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe VI',
      cpf: 'evaluator CPF VI',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe VII',
      cpf: 'evaluator CPF VII',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe VIII',
      cpf: 'evaluator CPF VIII',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe IX',
      cpf: 'evaluator CPF IX',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe X',
      cpf: 'evaluator CPF X',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe XI',
      cpf: 'evaluator CPF XI',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe XII',
      cpf: 'evaluator CPF XII',
      status: 'to_evaluate',
    });

    await listEvaluators.execute('', 1, admin.id);

    const response = await listEvaluators.execute('', 2, admin.id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the evaluators from the first page which includes a search string', async () => {
    const evaluatorSearch = 'Evaluators Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe II',
      cpf: 'evaluator CPF II',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe III',
      cpf: 'evaluator CPF III',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: evaluatorSearch,
      cpf: 'evaluator CPF IV',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe V',
      cpf: 'evaluator CPF V',
      status: 'to_evaluate',
    });

    await draftEvaluatorsRepository.create({
      name: 'John Doe VI',
      cpf: 'evaluator CPF VI',
      status: 'to_evaluate',
    });

    const response = await listEvaluators.execute(evaluatorSearch, 1, admin.id);

    expect(response).toHaveLength(1);
  });
});
