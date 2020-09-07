import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGradesService from '@modules/grades/services/ListGradesService';
import CreateGradeService from '@modules/grades/services/CreateGradeService';
import UpdateGradeService from '@modules/grades/services/UpdateGradeService';
import DeleteGradeService from '@modules/grades/services/DeleteGradeService';

export default class GradesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { avaliation_id } = request.params;

    const listGrades = container.resolve(ListGradesService);

    const grades = await listGrades.execute(avaliation_id);

    return response.json(grades);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { grades } = request.body;

    const createGrade = container.resolve(CreateGradeService);

    const createdGrade = await createGrade.execute({
      grades,
    });

    return response.json(createdGrade);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { grades } = request.body;

    const updateGrade = container.resolve(UpdateGradeService);

    const updatedGrade = await updateGrade.execute({
      grades,
    });

    return response.json(updatedGrade);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGrade = container.resolve(DeleteGradeService);

    await deleteGrade.execute(id);

    return response.status(200).send();
  }
}
