import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';

import Grade from '../infra/typeorm/entities/Grade';

@injectable()
class ListGradesService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,

    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,
  ) {}

  public async execute(avaliation_id: string): Promise<Grade[]> {
    const checkAvaliationExists = await this.avaliationsRepository.findById(
      avaliation_id,
    );

    if (!checkAvaliationExists) {
      throw new AppError('Informed avaliation does not exists.');
    }

    const grades = await this.gradesRepository.findAllGradesByAvaliationId(
      avaliation_id,
    );

    return grades;
  }
}

export default ListGradesService;
