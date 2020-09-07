import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import Evaluator from '../infra/typeorm/entities/Evaluator';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

interface IRequest {
  cpf: string;
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

  public async execute({ cpf }: IRequest): Promise<IResponse> {
    const evaluator = await this.evaluatorsRepository.findByCpf(cpf);

    if (!evaluator) {
      throw new AppError('Incorrect CPF.', 401);
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
