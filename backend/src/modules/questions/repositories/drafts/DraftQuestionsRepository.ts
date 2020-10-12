import { v4 } from 'uuid';

import ICreateQuestionDTO from '@modules/questions/dtos/ICreateOrUpdateQuestionDTO';

import Question from '@modules/questions/infra/typeorm/entities/Question';

import IQuestionsRepository from '../IQuestionsRepository';

export default class DraftQuestionsRepository implements IQuestionsRepository {
  private questions: Question[] = [];

  public async findAllQuestions(search: string): Promise<Question[]> {
    const questions = search
      ? this.questions.filter(findQuestion =>
          findQuestion.section.includes(search),
        )
      : this.questions;

    return questions;
  }

  public async findById(id: string): Promise<Question | undefined> {
    const question = this.questions.find(
      findQuestion => findQuestion.id === id,
    );

    return question;
  }

  public async create(questionData: ICreateQuestionDTO): Promise<Question> {
    const question = new Question();

    Object.assign(question, { id: v4() }, questionData);

    this.questions.push(question);

    return question;
  }

  public async save(question: Question): Promise<Question> {
    const findIndex = this.questions.findIndex(
      findQuestion => findQuestion.id === question.id,
    );

    this.questions[findIndex] = question;

    return question;
  }

  public async remove(question: Question): Promise<void> {
    const findIndex = this.questions.findIndex(
      findQuestion => findQuestion.id === question.id,
    );

    this.questions.splice(findIndex, 1);
  }
}
