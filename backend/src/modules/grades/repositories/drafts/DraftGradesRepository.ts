import { v4 } from 'uuid';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';

import ICreateGradeDTO from '@modules/grades/dtos/ICreateOrUpdateGradeDTO';

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

  public async findById(id: string): Promise<Grade | undefined> {
    const grade = this.grades.find(findGrade => findGrade.id === id);

    return grade;
  }

  public async create(gradeData: ICreateGradeDTO): Promise<Grade> {
    const grade = new Grade();

    Object.assign(grade, { id: v4() }, gradeData);

    this.grades.push(grade);

    return grade;
  }

  public async save(grade: Grade): Promise<Grade> {
    const findIndex = this.grades.findIndex(
      findGrade => findGrade.id === grade.id,
    );

    this.grades[findIndex] = grade;

    return grade;
  }

  public async remove(grade: Grade): Promise<void> {
    const findIndex = this.grades.findIndex(
      findGrade => findGrade.id === grade.id,
    );

    this.grades.splice(findIndex, 1);
  }
}
