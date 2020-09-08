import AppError from '@shared/errors/AppError';

import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftGradesRepository from '@modules/grades/repositories/drafts/DraftGradesRepository';

import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';
import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import ListGradesService from './ListGradesService';
import CreateGradesService from './CreateGradesService';

let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftGradesRepository: DraftGradesRepository;

let draftQuestionsRepository: DraftQuestionsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;
let draftProjectsRepository: DraftProjectsRepository;

let listGrades: ListGradesService;
let createGrades: CreateGradesService;

describe('ListGrades', () => {
  beforeEach(() => {
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftGradesRepository = new DraftGradesRepository();

    draftQuestionsRepository = new DraftQuestionsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();
    draftProjectsRepository = new DraftProjectsRepository();

    listGrades = new ListGradesService(
      draftGradesRepository,
      draftAvaliationsRepository,
    );

    createGrades = new CreateGradesService(
      draftGradesRepository,
      draftAvaliationsRepository,
      draftQuestionsRepository,
      draftEvaluatorsRepository,
    );
  });

  it('should be able to list all grades by an evaluator id', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    const firstProject = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const secondProject = await draftProjectsRepository.create({
      name: 'Project Name II',
    });

    const firstAvaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: firstProject.id,
    });

    const secondAvaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: secondProject.id,
    });

    const firstQuestion = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    const secondQuestion = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name II',
    });

    const thirdQuestion = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name III',
    });

    await createGrades.execute({
      avaliation_id: firstAvaliation.id,
      grades: [
        {
          question_id: firstQuestion.id,
          grade: 6.0,
        },
        {
          question_id: secondQuestion.id,
          grade: 6.0,
        },
        {
          question_id: thirdQuestion.id,
          grade: 6.0,
        },
      ],
    });

    await createGrades.execute({
      avaliation_id: secondAvaliation.id,
      grades: [
        {
          question_id: firstQuestion.id,
          grade: 6.0,
        },
        {
          question_id: secondQuestion.id,
          grade: 6.0,
        },
        {
          question_id: thirdQuestion.id,
          grade: 6.0,
        },
      ],
    });

    const response = await listGrades.execute(firstAvaliation.id);

    expect(response).toHaveLength(3);
  });

  it('should not be able to list grades with non existing avaliation', async () => {
    await expect(
      listGrades.execute('non existing avaliation id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
