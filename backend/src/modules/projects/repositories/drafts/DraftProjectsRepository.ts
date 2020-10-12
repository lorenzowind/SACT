import { v4 } from 'uuid';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateOrUpdateProjectDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

import IProjectsRepository from '../IProjectsRepository';

export default class DraftProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async findAllProjects(search: string): Promise<Project[]> {
    const projects = search
      ? this.projects.filter(findProject => findProject.name.includes(search))
      : this.projects;

    return projects;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = this.projects.find(findProject => findProject.id === id);

    return project;
  }

  public async findByName(name: string): Promise<Project | undefined> {
    const project = this.projects.find(
      findProject => findProject.name === name,
    );

    return project;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, { id: v4() }, projectData);

    this.projects.push(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      findProject => findProject.id === project.id,
    );

    this.projects[findIndex] = project;

    return project;
  }

  public async remove(project: Project): Promise<void> {
    const findIndex = this.projects.findIndex(
      findProject => findProject.id === project.id,
    );

    this.projects.splice(findIndex, 1);
  }
}
