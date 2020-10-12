import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftAdminsRepository from '@modules/admins/repositories/drafts/DraftAdminsRepository';
import DraftProjectsRepository from '../repositories/drafts/DraftProjectsRepository';

import ListProjectsService from './ListProjectsService';

let draftAdminsRepository: DraftAdminsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let draftCacheProvider: DraftCacheProvider;

let listProjects: ListProjectsService;

describe('ListProjects', () => {
  beforeEach(() => {
    draftAdminsRepository = new DraftAdminsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listProjects = new ListProjectsService(
      draftProjectsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the projects from the first page', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    const response = await listProjects.execute('', admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to return the same projects if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await listProjects.execute('', admin.id);

    const response = await listProjects.execute('', admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to list all the projects from the first page which includes a search string', async () => {
    const projectSearch = 'Project Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      ra: '111111',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    await draftProjectsRepository.create({
      name: 'Project Name III',
    });

    await draftProjectsRepository.create({
      name: projectSearch,
    });

    await draftProjectsRepository.create({
      name: 'Project Name V',
    });

    await draftProjectsRepository.create({
      name: 'Project Name VI',
    });

    const response = await listProjects.execute(projectSearch, admin.id);

    expect(response).toHaveLength(1);
  });
});
