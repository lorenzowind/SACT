import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';

import ICreateAvaliationDTO from '@modules/avaliations/dtos/ICreateOrUpdateAvaliationDTO';

import Avaliation from '../entities/Avaliation';

class AvaliationsRepository implements IAvaliationsRepository {
  private ormRepository: Repository<Avaliation>;

  constructor() {
    this.ormRepository = getRepository(Avaliation);
  }

  public async findAllAvaliationsByEvaluatorId(
    evaluator_id: string,
  ): Promise<Avaliation[]> {
    const avaliations = await this.ormRepository.find({
      where: { evaluator_id },
    });

    return avaliations;
  }

  public async findById(id: string): Promise<Avaliation | undefined> {
    const findAvaliation = await this.ormRepository.findOne(id);

    return findAvaliation;
  }

  public async create(
    avaliationData: ICreateAvaliationDTO,
  ): Promise<Avaliation> {
    const avaliation = this.ormRepository.create(avaliationData);

    Object.assign(avaliation, { id: v4() });

    await this.ormRepository.save(avaliation);

    return avaliation;
  }

  public async save(avaliation: Avaliation): Promise<Avaliation> {
    return this.ormRepository.save(avaliation);
  }

  public async remove(avaliation: Avaliation): Promise<void> {
    await this.ormRepository.remove(avaliation);
  }
}

export default AvaliationsRepository;
