import Avaliation from '../infra/typeorm/entities/Avaliation';

import ICreateAvaliationDTO from '../dtos/IUpdateAvaliationDTO';

export default interface IAvaliationsRepository {
  findAllAvaliations(): Promise<Avaliation[]>;
  findAllAvaliationsByEvaluatorId(evaluator_id: string): Promise<Avaliation[]>;
  findById(id: string): Promise<Avaliation | undefined>;
  create(data: ICreateAvaliationDTO): Promise<Avaliation>;
  save(avaliation: Avaliation): Promise<Avaliation>;
  remove(avaliation: Avaliation): Promise<void>;
}
