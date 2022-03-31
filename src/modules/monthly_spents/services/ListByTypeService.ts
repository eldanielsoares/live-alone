/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MonthlySpents from '../infra/typeorm/entities/MonthlySpents';
import IMonthlySpentRepository from '../repositories/IMonthlySpentRepository';

@injectable()
class ListByTypeService {
  constructor(
    @inject('MonthlySpentsRepository')
    private monthlySpentRepository: IMonthlySpentRepository,
  ) {}

  public async execute(
    user_id: string,
    type: string,
  ): Promise<MonthlySpents[]> {
    const monthlyByType = await this.monthlySpentRepository.list(user_id, type);

    if (monthlyByType.length === 0) {
      throw new AppError('monthly spent not found');
    }

    return monthlyByType;
  }
}

export default ListByTypeService;
