import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateEvaluatorService from '@modules/evaluators/services/AuthenticateEvaluatorService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const authenticateEvaluator = container.resolve(
      AuthenticateEvaluatorService,
    );

    const { evaluator, token } = await authenticateEvaluator.execute({
      email,
    });

    return response.json({ evaluator, token });
  }
}
