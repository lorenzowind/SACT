import { injectable, inject } from 'tsyringe';
import PDFDocument from 'pdfkit';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';

interface ProjectReport {
  project_id: string;
  grade_sum: number;
  factor: number;
}

interface Data {
  occupation_area: string;
  projects_report: ProjectReport[];
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

function sort(projects_report: ProjectReport[]): ProjectReport[] {
  for (let i = 0; i < projects_report.length; i += 1) {
    for (let j = 0; j < projects_report.length; j += 1) {
      const projectA = Number(
        (projects_report[i].grade_sum / projects_report[i].factor).toFixed(2),
      );

      const projectB = Number(
        (projects_report[j].grade_sum / projects_report[j].factor).toFixed(2),
      );

      if (projectA > projectB) {
        const auxProject = projects_report[i];
        // eslint-disable-next-line no-param-reassign
        projects_report[i] = projects_report[j];
        // eslint-disable-next-line no-param-reassign
        projects_report[j] = auxProject;
      }
    }
  }

  return projects_report;
}

@injectable()
class GetCourseRankingReportService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,

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

      if (project && project.occupation_area) {
        const occupationAreaIndex = data.findIndex(
          findData => findData.occupation_area === project.occupation_area,
        );

        const grades = await this.gradesRepository.findAllGradesByAvaliationId(
          avaliations[i].id,
        );

        if (occupationAreaIndex !== -1) {
          const projectReportIndex = data[
            occupationAreaIndex
          ].projects_report.findIndex(
            findProject => findProject.project_id === project.id,
          );

          if (projectReportIndex !== -1) {
            for (
              let gradesIndex = 0;
              gradesIndex < grades.length;
              gradesIndex += 1
            ) {
              const question = await this.questionsRepository.findById(
                grades[gradesIndex].question_id,
              );

              if (question) {
                data[occupationAreaIndex].projects_report[
                  projectReportIndex
                ].grade_sum += Number(
                  grades[gradesIndex].grade * Number(question.weight),
                );

                data[occupationAreaIndex].projects_report[
                  projectReportIndex
                ].factor += Number(question.weight);
              }
            }
          } else {
            let grade_sum = 0;
            let factor = 0;

            for (
              let gradesIndex = 0;
              gradesIndex < grades.length;
              gradesIndex += 1
            ) {
              const question = await this.questionsRepository.findById(
                grades[gradesIndex].question_id,
              );

              if (question) {
                grade_sum += Number(
                  grades[gradesIndex].grade * Number(question.weight),
                );
                factor += Number(question.weight);
              }
            }

            data[occupationAreaIndex].projects_report.push({
              project_id: project.id,
              grade_sum,
              factor,
            });
          }
        } else {
          const auxProjectReport = {
            project_id: project.id,
          } as ProjectReport;

          for (
            let gradesIndex = 0;
            gradesIndex < grades.length;
            gradesIndex += 1
          ) {
            const question = await this.questionsRepository.findById(
              grades[gradesIndex].question_id,
            );

            if (question) {
              auxProjectReport.grade_sum = Number(
                grades[gradesIndex].grade * Number(question.weight),
              );

              auxProjectReport.factor = Number(question.weight);
            }
          }

          data.push({
            occupation_area: project.occupation_area,
            projects_report: [auxProjectReport],
          });
        }
      }
    }

    const pdfDocument = new PDFDocument();

    pdfDocument.pipe(fs.createWriteStream('tmp/CourseRankingReport.pdf'));

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

      sort(data[i].projects_report);

      for (let j = 0; j < data[i].projects_report.length; j += 1) {
        const project = await this.projectsRepository.findById(
          data[i].projects_report[j].project_id,
        );

        if (project) {
          const total = (
            data[i].projects_report[j].grade_sum /
            data[i].projects_report[j].factor
          ).toFixed(2);

          pdfDocument
            .fontSize(20)
            .fillColor('#000')
            .text(project.name, { align: 'center' })
            .text(total, { align: 'center' });
        }
      }
    }

    pdfDocument.end();

    const fileName = await this.storageProvider.saveFile(
      'CourseRankingReport.pdf',
    );

    return getImageUrl(fileName);
  }
}

export default GetCourseRankingReportService;
