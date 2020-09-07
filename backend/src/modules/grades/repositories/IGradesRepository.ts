import Grade from '../infra/typeorm/entities/Grade';

import ICreateGradeDTO from '../dtos/ICreateGradeDTO';

export default interface IGradesRepository {
  findAllGradesByAvaliationId(avaliation_id: string): Promise<Grade[]>;
  create(data: ICreateGradeDTO): Promise<Grade>;
}
