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
class UpdateFinancialProfileService {
  constructor(
    @inject('FinancialProfileRepository')
    private financialProfileRepository: IFinancialProfileRepository,
  ) {}

  public async execute(data: IRequest): Promise<FinancialProfile> {
    const financialProfile = await this.financialProfileRepository.findByUserId(
      data.user_id,
    );
    if (!financialProfile) {
      throw new AppError('Financial Profile doenst exists', 404);
    }

    Object.assign(financialProfile, data);

    await this.financialProfileRepository.update(financialProfile);

    return financialProfile;
  }
}

export default UpdateFinancialProfileService;
