/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import MonthlySpents from '../infra/typeorm/entities/MonthlySpents';
import IMonthlySpentRepository from '../repositories/IMonthlySpentRepository';

interface IRequest {
  name: string;
  value: number;
  type: 'fixed' | 'variable';
  user_id: string;
}

@injectable()
class CreateMonthlySpentService {
  constructor(
    @inject('MonthlySpentsRepository')
    private monthlySpentsRepository: IMonthlySpentRepository,
  ) {}

  public async execute({
    name,
    type,
    user_id,
    value,
  }: IRequest): Promise<MonthlySpents> {
    const monthSpent = await this.monthlySpentsRepository.create({
      name,
      type,
      user_id,
      value,
    });

    return monthSpent;
  }
}

export default CreateMonthlySpentService;
