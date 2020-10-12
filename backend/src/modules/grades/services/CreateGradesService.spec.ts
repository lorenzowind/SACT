import AppError from '@shared/errors/AppError';

import DraftGradesRepository from '@modules/grades/repositories/drafts/DraftGradesRepository';
import DraftAvaliationsRepository from '@modules/avaliations/repositories/drafts/DraftAvaliationsRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftEvaluatorsRepository from '@modules/evaluators/repositories/drafts/DraftEvaluatorsRepository';

import DraftProjectsRepository from '@modules/projects/repositories/drafts/DraftProjectsRepository';

import CreateGradesService from './CreateGradesService';

let draftGradesRepository: DraftGradesRepository;
let draftAvaliationsRepository: DraftAvaliationsRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let draftProjectsRepository: DraftProjectsRepository;

let createGrades: CreateGradesService;

describe('CreateGrades', () => {
  beforeEach(() => {
    draftGradesRepository = new DraftGradesRepository();
    draftAvaliationsRepository = new DraftAvaliationsRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    draftProjectsRepository = new DraftProjectsRepository();

    createGrades = new CreateGradesService(
      draftGradesRepository,
      draftAvaliationsRepository,
      draftQuestionsRepository,
      draftEvaluatorsRepository,
    );
  });

  it('should be able to create new grades', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
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

    const grades = await createGrades.execute({
      avaliation_id: avaliation.id,
      comments: 'Comments about the project',
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

    expect(grades).toHaveLength(3);
  });

  it('should not be able to create grades with non existing avaliation', async () => {
    const question = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await expect(
      createGrades.execute({
        avaliation_id: 'non existing avaliation id',
        comments: 'Comments about the project',
        grades: [
          {
            question_id: question.id,
            grade: 6.0,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new grades with avaliation already evaluated', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    const question = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await createGrades.execute({
      avaliation_id: avaliation.id,
      comments: 'Comments about the project',
      grades: [
        {
          question_id: question.id,
          grade: 6.0,
        },
      ],
    });

    await expect(
      createGrades.execute({
        avaliation_id: avaliation.id,
        comments: 'Comments about the project',
        grades: [
          {
            question_id: question.id,
            grade: 6.0,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new grades with non existing question', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const project = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const avaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: project.id,
    });

    await expect(
      createGrades.execute({
        avaliation_id: avaliation.id,
        comments: 'Comments about the project',
        grades: [
          {
            question_id: 'non existing question id',
            grade: 6.0,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to evaluate the projects and have the status changed', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      email: 'evaluator@email.com',
    });

    const firstProject = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const secondProject = await draftProjectsRepository.create({
      name: 'Project Name',
    });

    const firstAvaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: firstProject.id,
    });

    const secondAvaliation = await draftAvaliationsRepository.create({
      evaluator_id: evaluator.id,
      project_id: secondProject.id,
    });

    const question = await draftQuestionsRepository.create({
      section: 'Section Name',
      criterion: 'Criterion Name',
    });

    await createGrades.execute({
      avaliation_id: firstAvaliation.id,
      comments: 'Comments about the project',
      grades: [
        {
          question_id: question.id,
          grade: 6.0,
        },
      ],
    });

    await createGrades.execute({
      avaliation_id: secondAvaliation.id,
      comments: 'Comments about the project',
      grades: [
        {
          question_id: question.id,
          grade: 6.0,
        },
      ],
    });

    const updatedEvaluator = await draftEvaluatorsRepository.findById(
      evaluator.id,
    );

    const expected = { status: 'rated' };

    expect(updatedEvaluator).toMatchObject(expected);
  });
});
