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
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe II',
      ra: '111111',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute('', admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to return the same admins if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await listAdmins.execute('', admin.id);

    const response = await listAdmins.execute('', admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to list all the admins who includes a search string', async () => {
    const adminSearch = 'Admin Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe II',
      ra: '222222',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe III',
      ra: '333333',
      email: 'johndoeIII@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: adminSearch,
      ra: '444444',
      email: 'johndoeIV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe V',
      ra: '555555',
      email: 'johndoeV@example.com',
      password: '123456',
    });

    await draftAdminsRepository.create({
      name: 'John Doe VI',
      ra: '666666',
      email: 'johndoeVI@example.com',
      password: '123456',
    });

    const response = await listAdmins.execute(adminSearch, admin.id);

    expect(response).toHaveLength(1);
  });
});
