import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateAdminService from '@modules/admins/services/AuthenticateAdminService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ra, password } = request.body;

    const authenticateAdmin = container.resolve(AuthenticateAdminService);

    const { admin, token } = await authenticateAdmin.execute({
      ra,
      password,
    });

    return response.json({ admin: classToClass(admin), token });
  }
}
