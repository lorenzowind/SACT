import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

import Question from '../infra/typeorm/entities/Question';

import IUpdateQuestionDTO from '../dtos/ICreateOrUpdateQuestionDTO';

interface IRequest extends IUpdateQuestionDTO {
  id: string;
}

@injectable()
class UpdateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    section,
    criterion,
    min_grade,
    max_grade,
  }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.findById(id);

    if (!question) {
      throw new AppError('Question not found.');
    }

    question.section = section;
    question.criterion = criterion;
    question.min_grade = min_grade;
    question.max_grade = max_grade;

    await this.cacheProvider.invalidatePrefix('questions-list');

    return this.questionsRepository.save(question);
  }
}

export default UpdateQuestionService;
