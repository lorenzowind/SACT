import { injectable, inject } from 'tsyringe';
import PDFDocument from 'pdfkit';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';

interface ProjectReport {
  project_id: string;
  questions: {
    question_id: string;
    grade: number;
  }[];
}

interface Data {
  occupation_area: string;
  evaluators: {
    evaluator_id: string;
    projects_report: ProjectReport[];
  }[];
}

function getImageUrl(fileName: string): string | null {
  if (!fileName) {
    return null;
  }

  switch (uploadConfig.driver) {
    case 'disk':
      return `${process.env.APP_API_URL}/files/${fileName}`;
    case 's3':
      return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${fileName}`;
    default:
      return null;
  }
}

@injectable()
class GetDetailedRankingReportService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(): Promise<any> {
    const avaliations = await this.avaliationsRepository.findAllAvaliations();

    const data: Data[] = [];

    for (let i = 0; i < avaliations.length; i += 1) {
      const project = await this.projectsRepository.findById(
        avaliations[i].project_id,
      );

      const evaluator = await this.evaluatorsRepository.findById(
        avaliations[i].evaluator_id,
      );

      if (project && evaluator && project.occupation_area) {
        let occupationAreaIndex = data.findIndex(
          findData => findData.occupation_area === project.occupation_area,
        );

        const grades = await this.gradesRepository.findAllGradesByAvaliationId(
          avaliations[i].id,
        );

        if (occupationAreaIndex === -1) {
          data.push({
            occupation_area: project.occupation_area,
            evaluators: [],
          });

          occupationAreaIndex = data.length - 1;
        }

        let evaluatorIndex = data[occupationAreaIndex].evaluators.findIndex(
          findEvaluator => findEvaluator.evaluator_id === evaluator.id,
        );

        if (evaluatorIndex === -1) {
          data[occupationAreaIndex].evaluators.push({
            evaluator_id: evaluator.id,
            projects_report: [],
          });

          evaluatorIndex = data[occupationAreaIndex].evaluators.length - 1;
        }

        for (
          let gradesIndex = 0;
          gradesIndex < grades.length;
          gradesIndex += 1
        ) {
          const question = await this.questionsRepository.findById(
            grades[gradesIndex].question_id,
          );

          const projectReportIndex = data[occupationAreaIndex].evaluators[
            evaluatorIndex
          ].projects_report.findIndex(
            findProject => findProject.project_id === project.id,
          );

          if (question) {
            if (projectReportIndex !== -1) {
              data[occupationAreaIndex].evaluators[
                evaluatorIndex
              ].projects_report[projectReportIndex].project_id = project.id;

              data[occupationAreaIndex].evaluators[
                evaluatorIndex
              ].projects_report[projectReportIndex].questions.push({
                question_id: question.id,
                grade: grades[gradesIndex].grade,
              });
            } else {
              data[occupationAreaIndex].evaluators[
                evaluatorIndex
              ].projects_report.push({
                project_id: project.id,
                questions: [
                  {
                    question_id: question.id,
                    grade: grades[gradesIndex].grade,
                  },
                ],
              });
            }
          }
        }
      }
    }

    const pdfDocument = new PDFDocument();

    pdfDocument.pipe(fs.createWriteStream('tmp/DetailedRankingReport.pdf'));

    pdfDocument
      .fontSize(36)
      .text('SACT - Relatório de classificação por curso', {
        align: 'center',
      });
    pdfDocument.addPage();

    if (data.length === 0) {
      pdfDocument.text('Nenhum projeto foi avaliado até o momento', {
        align: 'center',
      });
    }

    for (let i = 0; i < data.length; i += 1) {
      if (i !== 0) {
        pdfDocument.addPage();
      }

      pdfDocument
        .fontSize(24)
        .fillColor('#0000db')
        .text(data[i].occupation_area, { align: 'center' });

      for (let j = 0; j < data[i].evaluators.length; j += 1) {
        const evaluator = await this.evaluatorsRepository.findById(
          data[i].evaluators[j].evaluator_id,
        );

        if (evaluator) {
          pdfDocument
            .fontSize(24)
            .fillColor('#000')
            .text(`Avaliador: ${evaluator.name}`, { align: 'center' });
        }

        for (
          let k = 0;
          k < data[i].evaluators[j].projects_report.length;
          k += 1
        ) {
          const project = await this.projectsRepository.findById(
            data[i].evaluators[j].projects_report[k].project_id,
          );

          if (project) {
            pdfDocument
              .fontSize(24)
              .fillColor('#000')
              .text(`Projeto: ${project.name}`, { align: 'left' });
          }

          for (
            let l = 0;
            l < data[i].evaluators[j].projects_report[k].questions.length;
            l += 1
          ) {
            const question = await this.questionsRepository.findById(
              data[i].evaluators[j].projects_report[k].questions[l].question_id,
            );

            if (question) {
              pdfDocument.text(
                `${question.criterion}: ${data[i].evaluators[j].projects_report[k].questions[l].grade}`,
                { align: 'left' },
              );
            }
          }
        }

        pdfDocument.addPage();
      }
    }

    pdfDocument.end();

    const fileName = await this.storageProvider.saveFile(
      'DetailedRankingReport.pdf',
    );

    return getImageUrl(fileName);
  }
}

export default GetDetailedRankingReportService;
