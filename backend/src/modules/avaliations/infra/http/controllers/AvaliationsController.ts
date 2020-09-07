import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvaliationsService from '@modules/avaliations/services/ListAvaliationsService';
import CreateAvaliationService from '@modules/avaliations/services/CreateAvaliationService';
import UpdateAvaliationService from '@modules/avaliations/services/UpdateAvaliationService';
import DeleteAvaliationService from '@modules/avaliations/services/DeleteAvaliationService';

export default class AvaliationsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { evaluator_id } = request.params;

    const listAvaliations = container.resolve(ListAvaliationsService);

    const avaliations = await listAvaliations.execute(evaluator_id);

    return response.json(avaliations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { evaluator_id, project_id } = request.body;

    const createAvaliation = container.resolve(CreateAvaliationService);

    const avaliation = await createAvaliation.execute({
      evaluator_id,
      project_id,
    });

    return response.json(avaliation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { evaluator_id, project_id } = request.body;

    const updateAvaliation = container.resolve(UpdateAvaliationService);

    const avaliation = await updateAvaliation.execute({
      id,
      evaluator_id,
      project_id,
    });

    return response.json(avaliation);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAvaliation = container.resolve(DeleteAvaliationService);

    await deleteAvaliation.execute(id);

    return response.status(200).send();
  }
}
