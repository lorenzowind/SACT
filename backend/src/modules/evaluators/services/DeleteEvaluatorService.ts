import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

@injectable()
class DeleteEvaluatorService {
  constructor(
    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const evaluator = await this.evaluatorsRepository.findById(id);

    if (!evaluator) {
      throw new AppError('Evaluator not found.');
    }

    await this.evaluatorsRepository.remove(evaluator);

    await this.cacheProvider.invalidatePrefix('evaluators-list');
  }
}

export default DeleteEvaluatorService;
