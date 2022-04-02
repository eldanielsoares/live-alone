/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import FinancialProfile from '../infra/typeorm/entities/FinancialProfile';
import IFinancialProfileRepository from '../repositories/IFinancialProfileRepository';

@injectable()
class ShowFinancialProfileService {
  constructor(
    @inject('FinancialProfileRepository')
    private financialProfileRepository: IFinancialProfileRepository,
  ) {}

  public async execute(user_id: string): Promise<FinancialProfile> {
    const financialProfile = await this.financialProfileRepository.findByUserId(
      user_id,
    );
    if (!financialProfile) {
      throw new AppError('Financial Profile doenst exists', 404);
    }

    return financialProfile;
  }
}

export default ShowFinancialProfileService;
