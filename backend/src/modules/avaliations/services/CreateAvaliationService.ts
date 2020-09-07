import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

import ICreateAvaliationDTO from '../dtos/ICreateOrUpdateAvaliationDTO';

import Avaliation from '../infra/typeorm/entities/Avaliation';

@injectable()
class CreateAvaliationService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    evaluator_id,
    project_id,
  }: ICreateAvaliationDTO): Promise<Avaliation> {
    const checkEvaluatorExists = await this.evaluatorsRepository.findById(
      evaluator_id,
    );

    if (!checkEvaluatorExists) {
      throw new AppError('Informed evaluator does not exists.');
    }

    const checkProjectExists = await this.projectsRepository.findById(
      project_id,
    );

    if (!checkProjectExists) {
      throw new AppError('Informed project does not exists.');
    }

    const avaliation = await this.avaliationsRepository.create({
      evaluator_id,
      project_id,
    });

    return avaliation;
  }
}

export default CreateAvaliationService;
