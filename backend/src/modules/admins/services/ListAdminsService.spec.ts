import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftAdminsRepository from '../repositories/drafts/DraftAdminsRepository';

import ListAdminsService from './ListAdminsService';

let draftAdminsRepository: DraftAdminsRepository;

let draftCacheProvider: DraftCacheProvider;

let listAdmins: ListAdminsService;

describe('ListAdmins', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listAdmins = new ListAdminsService(
      draftAdminsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the admins from the first page', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute('', 1, admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute('', -1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list admins from the second page without accumulate the first one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute('', 2, admin.id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same admins if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await listAdmins.execute('', 1, admin.id);

    const response = await listAdmins.execute('', 1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate admins from the first page on the second one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await listAdmins.execute('', 1, admin.id);

    const response = await listAdmins.execute('', 2, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the admins', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe III',
      email: 'johndoeIII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe IV',
      email: 'johndoeIV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe V',
      email: 'johndoeV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe VI',
      email: 'johndoeVI@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe VII',
      email: 'johndoeVII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe VIII',
      email: 'johndoeVIII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe IX',
      email: 'johndoeIX@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe X',
      email: 'johndoeX@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe XI',
      email: 'johndoeXI@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe XI',
      email: 'johndoeXI@example.com',
      password: '123456',
    });

    await listAdmins.execute('', 1, admin.id);

    const response = await listAdmins.execute('', 2, admin.id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the admins from the first page which includes a search string', async () => {
    const adminSearch = 'Admin Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe III',
      email: 'johndoeIII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: adminSearch,
      email: 'johndoeIV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe V',
      email: 'johndoeV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe VI',
      email: 'johndoeVI@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute(adminSearch, 1, admin.id);

    expect(response).toHaveLength(1);
  });
});
