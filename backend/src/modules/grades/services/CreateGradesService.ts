import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';

import ICreateGradeRequestDTO from '../dtos/ICreateGradeRequestDTO';

import Grade from '../infra/typeorm/entities/Grade';

@injectable()
class CreateGradeService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,

    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,
  ) {}

  public async execute({
    avaliation_id,
    grades,
  }: ICreateGradeRequestDTO): Promise<Grade[]> {
    const checkAvaliationExists = await this.avaliationsRepository.findById(
      avaliation_id,
    );

    if (!checkAvaliationExists) {
      throw new AppError('Informed avaliation does not exists.');
    } else if (checkAvaliationExists.status === 'rated') {
      throw new AppError('This avaliation have already been evaluated.');
    }

    const createdGrades: Grade[] = [{} as Grade];

    grades.map(async informedGrade => {
      const checkQuestionExists = await this.questionsRepository.findById(
        informedGrade.question_id,
      );

      if (!checkQuestionExists) {
        throw new AppError('Informed question does not exists.');
      }

      const avaliation = await this.gradesRepository.create({
        avaliation_id,
        question_id: informedGrade.question_id,
        grade: informedGrade.grade,
      });

      createdGrades.push(avaliation);
    });

    checkAvaliationExists.status = 'rated';

    await this.avaliationsRepository.save(checkAvaliationExists);

    const avaliations = await this.avaliationsRepository.findAllAvaliationsByEvaluatorId(
      checkAvaliationExists.evaluator_id,
    );

    const checkAllRated = avaliations.every(
      avaliation => avaliation.status === 'rated',
    );

    if (checkAllRated) {
      checkAvaliationExists.evaluator.status = 'rated';

      await this.evaluatorsRepository.save(checkAvaliationExists.evaluator);
    }

    return createdGrades;
  }
}

export default CreateGradeService;
