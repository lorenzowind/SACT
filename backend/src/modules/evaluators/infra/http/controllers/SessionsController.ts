import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateEvaluatorService from '@modules/evaluators/services/AuthenticateEvaluatorService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const authenticateEvaluator = container.resolve(
      AuthenticateEvaluatorService,
    );

    const { evaluator, token } = await authenticateEvaluator.execute({
      cpf,
    });

    return response.json({ evaluator, token });
  }
}
