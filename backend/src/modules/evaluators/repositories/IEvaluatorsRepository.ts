import Evaluator from '../infra/typeorm/entities/Evaluator';

import ICreateEvaluatorDTO from '../dtos/ICreateOrUpdateEvaluatorDTO';

export default interface IEvaluatorsRepository {
  findAllEvaluators(search: string): Promise<Evaluator[]>;
  findById(id: string): Promise<Evaluator | undefined>;
  findByEmail(email: string): Promise<Evaluator | undefined>;
  create(data: ICreateEvaluatorDTO): Promise<Evaluator>;
  save(evaluator: Evaluator): Promise<Evaluator>;
  remove(evaluator: Evaluator): Promise<void>;
}
