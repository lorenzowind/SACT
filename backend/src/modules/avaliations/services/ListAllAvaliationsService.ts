import { injectable, inject } from 'tsyringe';

import IAvaliationsRepository from '../repositories/IAvaliationsRepository';

import Avaliation from '../infra/typeorm/entities/Avaliation';

@injectable()
class ListAllAvaliationsService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,
  ) {}

  public async execute(): Promise<Avaliation[]> {
    const avaliations = await this.avaliationsRepository.findAllAvaliations();

    return avaliations;
  }
}

export default ListAllAvaliationsService;
