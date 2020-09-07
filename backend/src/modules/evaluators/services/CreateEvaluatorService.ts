import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IEvaluatorsRepository from '../repositories/IEvaluatorsRepository';

import Evaluator from '../infra/typeorm/entities/Evaluator';

import ICreateEvaluatorDTO from '../dtos/ICreateOrUpdateEvaluatorDTO';

@injectable()
class CreateEvaluatorService {
  constructor(
    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    occupation_area,
    institution,
    phone_number,
    email,
    status,
    cpf,
  }: ICreateEvaluatorDTO): Promise<Evaluator> {
    const checkEvaluatorCpfExists = await this.evaluatorsRepository.findByCpf(
      cpf,
    );

    if (checkEvaluatorCpfExists) {
      throw new AppError('CPF already used.');
    }

    const evaluator = await this.evaluatorsRepository.create({
      name,
      occupation_area,
      institution,
      phone_number,
      email,
      status,
      cpf,
    });

    await this.cacheProvider.invalidatePrefix('evaluators-list');

    return evaluator;
  }
}

export default CreateEvaluatorService;
