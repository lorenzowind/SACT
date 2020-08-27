import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAdminService from '@modules/admins/services/CreateAdminService';
import UpdateAdminService from '@modules/admins/services/UpdateAdminService';
import DeleteAdminService from '@modules/admins/services/DeleteAdminService';

export default class AdminsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdmin = container.resolve(CreateAdminService);

    const admin = await createAdmin.execute({ name, email, password });

    return response.json(classToClass(admin));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateAdmin = container.resolve(UpdateAdminService);

    const admin = await updateAdmin.execute({ name, email, password });

    return response.json(classToClass(admin));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdmin = container.resolve(DeleteAdminService);

    const admin = await deleteAdmin.execute(id);

    return response.status(200).send();
  }
}
