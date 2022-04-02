/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FinancialProfile from '../infra/typeorm/entities/FinancialProfile';
import IFinancialProfileRepository from '../repositories/IFinancialProfileRepository';

interface IRequest {
  monthly_income: number;
  monthly_spent: number;
  job_type: string;
  current_emergency_reserve: number;
  user_id: string;
}

@injectable()
class CreateFinancialProfileService {
  constructor(
    @inject('FinancialProfileRepository')
    private financialProfileRepository: IFinancialProfileRepository,
  ) {}

  public async execute(data: IRequest): Promise<FinancialProfile> {
    const findFinancialProfile =
      await this.financialProfileRepository.findByUserId(data.user_id);

    if (findFinancialProfile) {
      throw new AppError('Financial Profile already exists');
    }
    const financialProfile = await this.financialProfileRepository.create(data);
    return financialProfile;
  }
}

export default CreateFinancialProfileService;
