import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAdminsService from '@modules/admins/services/ListAdminsService';
import CreateAdminService from '@modules/admins/services/CreateAdminService';
import UpdateAdminService from '@modules/admins/services/UpdateAdminService';
import DeleteAdminService from '@modules/admins/services/DeleteAdminService';

export default class AdminsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const admin_id = request.admin.id;

    const { search = '', page = 1 } = request.query;

    const listAdmins = container.resolve(ListAdminsService);

    const admins = await listAdmins.execute(
      String(search),
      Number(page),
      admin_id,
    );

    return response.json(classToClass(admins));
  }

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

    const admin = await updateAdmin.execute({ id, name, email, password });

    return response.json(classToClass(admin));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdmin = container.resolve(DeleteAdminService);

    await deleteAdmin.execute(id);

    return response.status(200).send();
  }
}
