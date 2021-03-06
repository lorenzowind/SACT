import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProjectsService from '@modules/projects/services/ListProjectsService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import DeleteProjectService from '@modules/projects/services/DeleteProjectService';

export default class ProjectsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const admin_id = request.admin.id;

    const { search = '' } = request.query;

    const listProjects = container.resolve(ListProjectsService);

    const projects = await listProjects.execute(String(search), admin_id);

    return response.json(classToClass(projects));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      occupation_area,
      classroom,
      members,
      observations,
    } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      description,
      occupation_area,
      classroom,
      members,
      observations,
    });

    return response.json(classToClass(project));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      description,
      occupation_area,
      classroom,
      members,
      observations,
    } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      id,
      name,
      description,
      occupation_area,
      classroom,
      members,
      observations,
    });

    return response.json(classToClass(project));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute(id);

    return response.status(200).send();
  }
}
