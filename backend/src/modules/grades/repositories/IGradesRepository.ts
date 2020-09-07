import Grade from '../infra/typeorm/entities/Grade';

import ICreateGradeDTO from '../dtos/ICreateOrUpdateGradeDTO';

export default interface IGradesRepository {
  findAllGradesByAvaliationId(avaliation_id: string): Promise<Grade[]>;
  findById(id: string): Promise<Grade | undefined>;
  create(data: ICreateGradeDTO): Promise<Grade>;
  save(grade: Grade): Promise<Grade>;
  remove(grade: Grade): Promise<void>;
}
