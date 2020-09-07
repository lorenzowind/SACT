import Evaluator from '../infra/typeorm/entities/Evaluator';

import ICreateEvaluatorDTO from '../dtos/ICreateOrUpdateEvaluatorDTO';

export default interface IEvaluatorsRepository {
  findAllEvaluators(search: string, page: number): Promise<Evaluator[]>;
  findById(id: string): Promise<Evaluator | undefined>;
  findByCpf(cpf: string): Promise<Evaluator | undefined>;
  create(data: ICreateEvaluatorDTO): Promise<Evaluator>;
  save(evaluator: Evaluator): Promise<Evaluator>;
  remove(evaluator: Evaluator): Promise<void>;
}
