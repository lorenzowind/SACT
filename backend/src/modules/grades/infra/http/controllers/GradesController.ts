import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGradesService from '@modules/grades/services/ListGradesService';
import CreateGradesService from '@modules/grades/services/CreateGradesService';

export default class GradesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { avaliation_id } = request.params;

    const listGrades = container.resolve(ListGradesService);

    const grades = await listGrades.execute(avaliation_id);

    return response.json(grades);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { avaliation_id, grades } = request.body;

    const createGrades = container.resolve(CreateGradesService);

    const createdGrades = await createGrades.execute({ avaliation_id, grades });

    return response.json(createdGrades);
  }
}
