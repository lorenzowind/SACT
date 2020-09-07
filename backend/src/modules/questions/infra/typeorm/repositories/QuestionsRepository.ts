import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';

import ICreateQuestionDTO from '@modules/questions/dtos/ICreateOrUpdateQuestionDTO';

import Question from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public async findAllQuestions(
    search: string,
    page: number,
  ): Promise<Question[]> {
    const questions =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              section: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return questions;
  }

  public async findById(id: string): Promise<Question | undefined> {
    const findQuestion = await this.ormRepository.findOne(id);

    return findQuestion;
  }

  public async create(questionData: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(questionData);

    Object.assign(question, { id: v4() });

    await this.ormRepository.save(question);

    return question;
  }

  public async save(question: Question): Promise<Question> {
    return this.ormRepository.save(question);
  }

  public async remove(question: Question): Promise<void> {
    await this.ormRepository.remove(question);
  }
}

export default QuestionsRepository;
