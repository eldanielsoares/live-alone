/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMonthlySpentRepository from '../repositories/IMonthlySpentRepository';

@injectable()
class DeleteMonthlySpentService {
  constructor(
    @inject('MonthlySpentsRepository')
    private monthlySpentsRepository: IMonthlySpentRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const monthlySpent = await this.monthlySpentsRepository.findById(id);

    if (!monthlySpent) {
      throw new AppError('User not found');
    }

    const deleteMothlySpent = await this.monthlySpentsRepository.delete(
      monthlySpent,
    );

    return deleteMothlySpent;
  }
}

export default DeleteMonthlySpentService;
