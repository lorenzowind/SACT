import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Question from '../infra/typeorm/entities/Question';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
class ListQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(search: string, admin_id: string): Promise<Question[]> {
    let questions = !search
      ? await this.cacheProvider.recover<Question[]>(
          `questions-list:${admin_id}`,
        )
      : null;

    if (!questions) {
      questions = await this.questionsRepository.findAllQuestions(search);

      if (!search) {
        await this.cacheProvider.save(`questions-list:${admin_id}`, questions);
      }
    }

    return questions;
  }
}

export default ListQuestionsService;
