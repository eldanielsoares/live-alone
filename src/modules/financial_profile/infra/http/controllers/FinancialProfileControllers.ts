import CreateFinancialProfileService from '@modules/financial_profile/services/CreateFinancialProfileService';
import ShowFinancialProfileService from '@modules/financial_profile/services/ShowFinancialProfileService';
import UpdateFinancialProfileService from '@modules/financial_profile/services/UpdateFinancialProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class FinancialProfileControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      monthly_income,
      monthly_spent,
      job_type,
      current_emergency_reserve,
    } = request.body;

    const createFinancialProfileService = container.resolve(
      CreateFinancialProfileService,
    );

    const financialProfile = await createFinancialProfileService.execute({
      monthly_income,
      monthly_spent,
      job_type,
      current_emergency_reserve,
      user_id: id,
    });

    return response.json(financialProfile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      monthly_income,
      monthly_spent,
      job_type,
      current_emergency_reserve,
    } = request.body;

    const createFinancialProfileService = container.resolve(
      UpdateFinancialProfileService,
    );

    const financialProfile = await createFinancialProfileService.execute({
      monthly_income,
      monthly_spent,
      job_type,
      current_emergency_reserve,
      user_id: id,
    });

    return response.json(financialProfile);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const createFinancialProfileService = container.resolve(
      ShowFinancialProfileService,
    );

    const financialProfile = await createFinancialProfileService.execute(id);

    return response.json(financialProfile);
  }
}

export default FinancialProfileControllers;
