import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliationsRepository from '../repositories/IAvaliationsRepository';

@injectable()
class DeleteAvaliationService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const avaliation = await this.avaliationsRepository.findById(id);

    if (!avaliation) {
      throw new AppError('Avaliation not found.');
    }

    await this.avaliationsRepository.remove(avaliation);
  }
}

export default DeleteAvaliationService;
