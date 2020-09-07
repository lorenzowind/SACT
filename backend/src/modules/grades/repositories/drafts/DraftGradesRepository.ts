import { v4 } from 'uuid';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';

import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';

import Grade from '@modules/grades/infra/typeorm/entities/Grade';

export default class DraftGradesRepository implements IGradesRepository {
  private grades: Grade[] = [];

  public async findAllGradesByAvaliationId(
    avaliation_id: string,
  ): Promise<Grade[]> {
    const grades = this.grades.filter(grade => {
      return grade.avaliation_id === avaliation_id;
    });

    return grades;
  }

  public async create(gradeData: ICreateGradeDTO): Promise<Grade> {
    const grade = new Grade();

    Object.assign(grade, { id: v4() }, gradeData);

    this.grades.push(grade);

    return grade;
  }
}
