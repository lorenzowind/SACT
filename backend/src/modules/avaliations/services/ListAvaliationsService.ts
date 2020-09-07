import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import IAvaliationsRepository from '../repositories/IAvaliationsRepository';

import Avaliation from '../infra/typeorm/entities/Avaliation';

@injectable()
class ListAvaliationsService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,
  ) {}

  public async execute(evaluator_id: string): Promise<Avaliation[]> {
    const checkEvaluatorExists = await this.evaluatorsRepository.findById(
      evaluator_id,
    );

    if (!checkEvaluatorExists) {
      throw new AppError('Informed evaluator does not exists.');
    }

    const avaliations = await this.avaliationsRepository.findAllAvaliationsByEvaluatorId(
      evaluator_id,
    );

    return avaliations;
  }
}

export default ListAvaliationsService;
