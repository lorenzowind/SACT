import { v4 } from 'uuid';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';

import ICreateAvaliationDTO from '@modules/avaliations/dtos/IUpdateAvaliationDTO';

import Avaliation from '@modules/avaliations/infra/typeorm/entities/Avaliation';

export default class DraftAvaliationsRepository
  implements IAvaliationsRepository {
  private avaliations: Avaliation[] = [];

  public async findAllAvaliations(): Promise<Avaliation[]> {
    return this.avaliations;
  }

  public async findAllAvaliationsByEvaluatorId(
    evaluator_id: string,
  ): Promise<Avaliation[]> {
    const avaliations = this.avaliations.filter(avaliation => {
      return avaliation.evaluator_id === evaluator_id;
    });

    return avaliations;
  }

  public async findById(id: string): Promise<Avaliation | undefined> {
    const avaliation = this.avaliations.find(
      findAvaliation => findAvaliation.id === id,
    );

    return avaliation;
  }

  public async create(
    avaliationData: ICreateAvaliationDTO,
  ): Promise<Avaliation> {
    const avaliation = new Avaliation();

    Object.assign(avaliation, { id: v4() }, avaliationData);

    this.avaliations.push(avaliation);

    return avaliation;
  }

  public async save(avaliation: Avaliation): Promise<Avaliation> {
    const findIndex = this.avaliations.findIndex(
      findAvaliation => findAvaliation.id === avaliation.id,
    );

    this.avaliations[findIndex] = avaliation;

    return avaliation;
  }

  public async remove(avaliation: Avaliation): Promise<void> {
    const findIndex = this.avaliations.findIndex(
      findAvaliation => findAvaliation.id === avaliation.id,
    );

    this.avaliations.splice(findIndex, 1);
  }
}
