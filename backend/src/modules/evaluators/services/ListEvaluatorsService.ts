import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Evaluator from '../infra/typeorm/entities/Evaluator';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

@injectable()
class ListEvaluatorsService {
  constructor(
    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(search: string, admin_id: string): Promise<Evaluator[]> {
    let evaluators = !search
      ? await this.cacheProvider.recover<Evaluator[]>(
          `evaluators-list:${admin_id}`,
        )
      : null;

    if (!evaluators) {
      evaluators = await this.evaluatorsRepository.findAllEvaluators(search);

      if (!search) {
        await this.cacheProvider.save(
          `evaluators-list:${admin_id}`,
          evaluators,
        );
      }
    }

    return evaluators;
  }
}

export default ListEvaluatorsService;
