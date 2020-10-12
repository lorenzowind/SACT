import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEvaluatorsService from '@modules/evaluators/services/ListEvaluatorsService';
import CreateEvaluatorService from '@modules/evaluators/services/CreateEvaluatorService';
import UpdateEvaluatorService from '@modules/evaluators/services/UpdateEvaluatorService';
import DeleteEvaluatorService from '@modules/evaluators/services/DeleteEvaluatorService';

export default class EvaluatorsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const admin_id = request.admin.id;

    const { search = '' } = request.query;

    const listEvaluators = container.resolve(ListEvaluatorsService);

    const evaluators = await listEvaluators.execute(String(search), admin_id);

    return response.json(evaluators);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      occupation_area,
      institution,
      phone_number,
      email,
      status,
    } = request.body;

    const createEvaluator = container.resolve(CreateEvaluatorService);

    const evaluator = await createEvaluator.execute({
      name,
      occupation_area,
      institution,
      phone_number,
      email,
      status,
    });

    return response.json(evaluator);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      occupation_area,
      institution,
      phone_number,
      email,
      status,
    } = request.body;

    const updateEvaluator = container.resolve(UpdateEvaluatorService);

    const evaluator = await updateEvaluator.execute({
      id,
      name,
      occupation_area,
      institution,
      phone_number,
      email,
      status,
    });

    return response.json(evaluator);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEvaluator = container.resolve(DeleteEvaluatorService);

    await deleteEvaluator.execute(id);

    return response.status(200).send();
  }
}
