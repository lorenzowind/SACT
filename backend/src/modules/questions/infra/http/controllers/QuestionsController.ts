import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListQuestionsService from '@modules/questions/services/ListQuestionsService';
import CreateQuestionService from '@modules/questions/services/CreateQuestionService';
import UpdateQuestionService from '@modules/questions/services/UpdateQuestionService';
import DeleteQuestionService from '@modules/questions/services/DeleteQuestionService';

export default class ProjectsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const admin_id = request.admin.id;

    const { search = '' } = request.query;

    const listQuestions = container.resolve(ListQuestionsService);

    const questions = await listQuestions.execute(String(search), admin_id);

    return response.json(questions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { section, criterion, min_grade, max_grade, weight } = request.body;

    const createQuestion = container.resolve(CreateQuestionService);

    const question = await createQuestion.execute({
      section,
      criterion,
      min_grade,
      max_grade,
      weight,
    });

    return response.json(question);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { section, criterion, min_grade, max_grade, weight } = request.body;

    const updateQuestion = container.resolve(UpdateQuestionService);

    const question = await updateQuestion.execute({
      id,
      section,
      criterion,
      min_grade,
      max_grade,
      weight,
    });

    return response.json(question);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuestion = container.resolve(DeleteQuestionService);

    await deleteQuestion.execute(id);

    return response.status(200).send();
  }
}
