import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

import Question from '../infra/typeorm/entities/Question';

import ICreateQuestionDTO from '../dtos/ICreateOrUpdateQuestionDTO';

@injectable()
class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    section,
    criterion,
  }: ICreateQuestionDTO): Promise<Question> {
    const question = await this.questionsRepository.create({
      section,
      criterion,
    });

    await this.cacheProvider.invalidatePrefix('questions-list');

    return question;
  }
}

export default CreateQuestionService;
