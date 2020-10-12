import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import Evaluator from '../infra/typeorm/entities/Evaluator';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

interface IRequest {
  email: string;
}

interface IResponse {
  evaluator: Evaluator;
  token: string;
}

@injectable()
class AuthenticateEvaluatorService {
  constructor(
    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<IResponse> {
    const evaluator = await this.evaluatorsRepository.findByEmail(email);

    if (!evaluator) {
      throw new AppError('Incorrect Email.', 401);
    }

    if (evaluator.status === 'rated') {
      throw new AppError('All projects have already been evaluated.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: evaluator.id,
      expiresIn,
    });

    return {
      evaluator,
      token,
    };
  }
}

export default AuthenticateEvaluatorService;
