import { v4 } from 'uuid';

import ICreateEvaluatorDTO from '@modules/evaluators/dtos/ICreateOrUpdateEvaluatorDTO';

import Evaluator from '@modules/evaluators/infra/typeorm/entities/Evaluator';

import IEvaluatorsRepository from '../IEvaluatorsRepository';

export default class DraftEvaluatorsRepository
  implements IEvaluatorsRepository {
  private evaluators: Evaluator[] = [];

  public async findAllEvaluators(search: string): Promise<Evaluator[]> {
    const evaluators = search
      ? this.evaluators.filter(findEvaluator =>
          findEvaluator.name.includes(search),
        )
      : this.evaluators;

    return evaluators;
  }

  public async findById(id: string): Promise<Evaluator | undefined> {
    const evaluator = this.evaluators.find(
      findEvaluator => findEvaluator.id === id,
    );

    return evaluator;
  }

  public async findByEmail(email: string): Promise<Evaluator | undefined> {
    const evaluator = this.evaluators.find(
      findEvaluator => findEvaluator.email === email,
    );

    return evaluator;
  }

  public async create(evaluatorData: ICreateEvaluatorDTO): Promise<Evaluator> {
    const evaluator = new Evaluator();

    Object.assign(evaluator, { id: v4() }, evaluatorData);

    this.evaluators.push(evaluator);

    return evaluator;
  }

  public async save(evaluator: Evaluator): Promise<Evaluator> {
    const findIndex = this.evaluators.findIndex(
      findEvaluator => findEvaluator.id === evaluator.id,
    );

    this.evaluators[findIndex] = evaluator;

    return evaluator;
  }

  public async remove(evaluator: Evaluator): Promise<void> {
    const findIndex = this.evaluators.findIndex(
      findEvaluator => findEvaluator.id === evaluator.id,
    );

    this.evaluators.splice(findIndex, 1);
  }
}
