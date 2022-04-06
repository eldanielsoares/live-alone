/* eslint-disable no-empty-function */
import FinancialProfile from '@modules/financial_profile/infra/typeorm/entities/FinancialProfile';
import IFinancialProfileRepository from '@modules/financial_profile/repositories/IFinancialProfileRepository';
import Furnitures from '@modules/furnitures/infra/typeorm/entities/Furnitures';
import IFurnitureRepository from '@modules/furnitures/repositories/IFurnituresRepository';
import MonthlySpents from '@modules/monthly_spents/infra/typeorm/entities/MonthlySpents';
import IMonthlySpentRepository from '@modules/monthly_spents/repositories/IMonthlySpentRepository';
import { inject, injectable } from 'tsyringe';

interface IResponse {
  monthlySpentFixed: MonthlySpents[];
  totalMonthlySpentFixed: number;
  monthlySpentVariable: MonthlySpents[];
  totalMonthlySpentVariable: number;
  financialProfile: FinancialProfile | undefined;
  hasFinancialProfile: boolean;
  emergency_reserve_recommended: number;
  furnitures: Furnitures[];
  totalFurnitures: number;
}

@injectable()
class HomeService {
  constructor(
    @inject('MonthlySpentsRepository')
    private monthlyRepository: IMonthlySpentRepository,
    @inject('FinancialProfileRepository')
    private financialProfileRepository: IFinancialProfileRepository,
    @inject('FurnitureRepository')
    private furnitureRepository: IFurnitureRepository,
  ) {}

  public async execute(id: string): Promise<IResponse> {
    const monthlySpentFixed = await this.monthlyRepository.list(id, 'fixed');
    const monthlySpentVariable = await this.monthlyRepository.list(
      id,
      'variable',
    );

    const financialProfile = await this.financialProfileRepository.findByUserId(
      id,
    );

    const furnitures = await this.furnitureRepository.showAllFurnitures(id);

    const totalMonthlySpentFixed = monthlySpentFixed.reduce(
      (previous, current) => previous + current.amount,
      0,
    );

    const totalMonthlySpentVariable = monthlySpentVariable.reduce(
      (previous, current) => previous + current.amount,
      0,
    );

    const totalFurnitures = furnitures.reduce(
      (previous, current) => previous + current.price,
      0,
    );

    let emergency_reserve_recommended = 0;

    if (financialProfile) {
      emergency_reserve_recommended =
        financialProfile.job_type === 'fixed_job'
          ? financialProfile.monthly_spent * 6
          : financialProfile.monthly_spent * 12;
    }

    return {
      monthlySpentFixed,
      totalMonthlySpentFixed,
      monthlySpentVariable,
      totalMonthlySpentVariable,
      financialProfile,
      hasFinancialProfile: !!financialProfile,
      emergency_reserve_recommended,
      furnitures,
      totalFurnitures,
    };
  }
}

export default HomeService;
