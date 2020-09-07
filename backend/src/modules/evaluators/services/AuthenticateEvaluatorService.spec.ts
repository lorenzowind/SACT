import AppError from '@shared/errors/AppError';

import DraftEvaluatorsRepository from '../repositories/drafts/DraftEvaluatorsRepository';

import AuthenticateEvaluatorService from './AuthenticateEvaluatorService';

let draftEvaluatorsRepository: DraftEvaluatorsRepository;

let authenticateEvaluator: AuthenticateEvaluatorService;

describe('AuthenticateEvaluator', () => {
  beforeEach(() => {
    draftEvaluatorsRepository = new DraftEvaluatorsRepository();

    authenticateEvaluator = new AuthenticateEvaluatorService(
      draftEvaluatorsRepository,
    );
  });

  it('should be able to authenticate', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
    });

    const response = await authenticateEvaluator.execute({
      cpf: 'evaluator CPF',
    });

    expect(response).toHaveProperty('token');
    expect(response.evaluator).toEqual(evaluator);
  });

  it('should not be able to authenticate with non existing evaluator', async () => {
    await expect(
      authenticateEvaluator.execute({
        cpf: 'evaluator CPF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an evaluator who alredy has evaluated all projects', async () => {
    const evaluator = await draftEvaluatorsRepository.create({
      name: 'John Doe',
      cpf: 'evaluator CPF',
      status: 'rated',
    });

    await expect(
      authenticateEvaluator.execute({
        cpf: 'evaluator CPF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
