import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

import Avaliation from '../infra/typeorm/entities/Avaliation';

import IUpdateAvaliationDTO from '../dtos/IUpdateAvaliationDTO';

interface IRequest extends IUpdateAvaliationDTO {
  id: string;
}

@injectable()
class UpdateAvaliationService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    id,
    evaluator_id,
    project_id,
  }: IRequest): Promise<Avaliation> {
    const avaliation = await this.avaliationsRepository.findById(id);

    if (!avaliation) {
      throw new AppError('Avaliation not found.');
    }

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

    avaliation.evaluator_id = evaluator_id;
    avaliation.project_id = project_id;

    return this.avaliationsRepository.save(avaliation);
  }
}

export default UpdateAvaliationService;
