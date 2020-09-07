import Question from '../infra/typeorm/entities/Question';

import ICreateQuestionDTO from '../dtos/ICreateOrUpdateQuestionDTO';

export default interface IQuestionsRepository {
  findAllQuestions(search: string, page: number): Promise<Question[]>;
  findById(id: string): Promise<Question | undefined>;
  create(data: ICreateQuestionDTO): Promise<Question>;
  save(question: Question): Promise<Question>;
  remove(question: Question): Promise<void>;
}
