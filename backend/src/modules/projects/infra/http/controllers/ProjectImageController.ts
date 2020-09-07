import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProjectImageService from '@modules/projects/services/UpdateProjectImageService';

export default class ProjectImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const updateProjectImage = container.resolve(UpdateProjectImageService);

    const project = await updateProjectImage.execute({
      project_id,
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(project));
  }
}
