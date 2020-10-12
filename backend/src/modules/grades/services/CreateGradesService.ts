import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';

import ICreateGradeRequestDTO from '../dtos/ICreateGradesRequestDTO';

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
    comments,
    grades,
  }: ICreateGradeRequestDTO): Promise<void> {
    const checkAvaliationExists = await this.avaliationsRepository.findById(
      avaliation_id,
    );

    if (!checkAvaliationExists) {
      throw new AppError('Informed avaliation does not exists.');
    } else if (checkAvaliationExists.status === 'rated') {
      throw new AppError('This avaliation have already been evaluated.');
    }

    const createdGrades: Grade[] = [];

    for (let index = 0; index < grades.length; index += 1) {
      const checkQuestionExists = await this.questionsRepository.findById(
        grades[index].question_id,
      );

      if (!checkQuestionExists) {
        throw new AppError('Informed question does not exists.');
      }

      const grade = await this.gradesRepository.create({
        avaliation_id,
        question_id: grades[index].question_id,
        grade: grades[index].grade,
      });

      createdGrades.push(grade);
    }

    checkAvaliationExists.status = 'rated';
    checkAvaliationExists.comments = comments;

    await this.avaliationsRepository.save(checkAvaliationExists);

    const avaliations = await this.avaliationsRepository.findAllAvaliationsByEvaluatorId(
      checkAvaliationExists.evaluator_id,
    );

    const checkAllRated = avaliations.every(
      avaliation => avaliation.status === 'rated',
    );

    if (checkAllRated) {
      const evaluator = await this.evaluatorsRepository.findById(
        checkAvaliationExists.evaluator_id,
      );

      /*
        The evaluator will always be found in the search above, therefore is
        no need to test the handling of an undefined evaluator.
      */

      if (evaluator) {
        evaluator.status = 'rated';

        await this.evaluatorsRepository.save(evaluator);
      }
    }
  }
}

export default CreateGradeService;
