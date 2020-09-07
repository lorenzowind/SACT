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
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    const response = await listProjects.execute('', 1, admin.id);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const response = await listProjects.execute('', -1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list projects from the second page without accumulate the first one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const response = await listProjects.execute('', 2, admin.id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same projects if the same request is made', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await listProjects.execute('', 1, admin.id);

    const response = await listProjects.execute('', 1, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate projects from the first page on the second one', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await draftProjectsRepository.create({
      name: 'Project Name',
    });

    await listProjects.execute('', 1, admin.id);

    const response = await listProjects.execute('', 2, admin.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the projects', async () => {
    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
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
      name: 'Project Name IV',
    });

    await draftProjectsRepository.create({
      name: 'Project Name V',
    });

    await draftProjectsRepository.create({
      name: 'Project Name VI',
    });

    await draftProjectsRepository.create({
      name: 'Project Name VII',
    });

    await draftProjectsRepository.create({
      name: 'Project Name VIII',
    });

    await draftProjectsRepository.create({
      name: 'Project Name IX',
    });

    await draftProjectsRepository.create({
      name: 'Project Name X',
    });

    await draftProjectsRepository.create({
      name: 'Project Name XI',
    });

    await draftProjectsRepository.create({
      name: 'Project Name XII',
    });

    await listProjects.execute('', 1, admin.id);

    const response = await listProjects.execute('', 2, admin.id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the projects from the first page which includes a search string', async () => {
    const projectSearch = 'Project Searching';

    const admin = await draftAdminsRepository.create({
      name: 'John Doe',
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

    const response = await listProjects.execute(projectSearch, 1, admin.id);

    expect(response).toHaveLength(1);
  });
});
