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

  public async execute(
    search: string,
    page: number,
    admin_id: string,
  ): Promise<Question[]> {
    let questions = !search
      ? await this.cacheProvider.recover<Question[]>(
          `questions-list:${admin_id}:page=${page}`,
        )
      : null;

    if (!questions) {
      questions = await this.questionsRepository.findAllQuestions(
        search,
        page > 0 ? page : 1,
      );

      const questionsPreviousPage = !search
        ? await this.cacheProvider.recover<Question[]>(
            `questions-list:${admin_id}:page=${page - 1}`,
          )
        : null;

      if (questionsPreviousPage) {
        questions = questionsPreviousPage.concat(questions);
      } else if (page > 1 && !search) {
        return [];
      }

      if (!search) {
        await this.cacheProvider.save(
          `questions-list:${admin_id}:page=${page}`,
          questions,
        );
      }
    }

    return questions;
  }
}

export default ListQuestionsService;
