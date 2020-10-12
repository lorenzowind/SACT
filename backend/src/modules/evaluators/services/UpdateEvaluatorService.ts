import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

import Evaluator from '../infra/typeorm/entities/Evaluator';

import IUpdateEvaluatorDTO from '../dtos/ICreateOrUpdateEvaluatorDTO';

interface IRequest extends IUpdateEvaluatorDTO {
  id: string;
}

@injectable()
class UpdateEvaluatorService {
  constructor(
    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    occupation_area,
    institution,
    phone_number,
    email,
  }: IRequest): Promise<Evaluator> {
    const evaluator = await this.evaluatorsRepository.findById(id);

    if (!evaluator) {
      throw new AppError('Evaluator not found.');
    }

    const evaluatorWithUpdatedEmail = await this.evaluatorsRepository.findByEmail(
      email,
    );

    if (evaluatorWithUpdatedEmail && evaluatorWithUpdatedEmail.id !== id) {
      throw new AppError('Email address already in use.');
    }

    evaluator.name = name;
    evaluator.occupation_area = occupation_area;
    evaluator.institution = institution;
    evaluator.phone_number = phone_number;
    evaluator.email = email;
    evaluator.status = 'to_evaluate';

    await this.cacheProvider.invalidatePrefix('evaluators-list');

    return this.evaluatorsRepository.save(evaluator);
  }
}

export default UpdateEvaluatorService;
