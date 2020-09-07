import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';

import ICreateGradeDTO from '@modules/grades/dtos/ICreateOrUpdateGradeDTO';

import Grade from '../entities/Grade';

class GradesRepository implements IGradesRepository {
  private ormRepository: Repository<Grade>;

  constructor() {
    this.ormRepository = getRepository(Grade);
  }

  public async findAllGradesByAvaliationId(grade_id: string): Promise<Grade[]> {
    const grades = await this.ormRepository.find({
      where: { grade_id },
    });

    return grades;
  }

  public async findById(id: string): Promise<Grade | undefined> {
    const findGrade = await this.ormRepository.findOne(id);

    return findGrade;
  }

  public async create(gradeData: ICreateGradeDTO): Promise<Grade> {
    const grade = this.ormRepository.create(gradeData);

    Object.assign(grade, { id: v4() });

    await this.ormRepository.save(grade);

    return grade;
  }

  public async save(grade: Grade): Promise<Grade> {
    return this.ormRepository.save(grade);
  }

  public async remove(grade: Grade): Promise<void> {
    await this.ormRepository.remove(grade);
  }
}

export default GradesRepository;
