import CreateMonthlySpentService from '@modules/monthly_spents/services/CreateMonthlySpentService';
import DeleteMonthlySpentService from '@modules/monthly_spents/services/DeleteMonthlySpentService';
import ListByTypeService from '@modules/monthly_spents/services/ListByTypeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateMonthlySpentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, value } = request.body;
    const { id } = request.user;
    const createMonthlySpentService = container.resolve(
      CreateMonthlySpentService,
    );

    const createMonthlySpent = await createMonthlySpentService.execute({
      name,
      type,
      user_id: id,
      value,
    });

    return response.json(createMonthlySpent);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const monthlySpentService = container.resolve(DeleteMonthlySpentService);

    const monthlySpentDelete = await monthlySpentService.execute(String(id));

    return response.json({ message: monthlySpentDelete });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { type } = request.body;

    const monthlySpentService = container.resolve(ListByTypeService);

    const listByTypeService = await monthlySpentService.execute(
      String(id),
      type,
    );

    return response.json(listByTypeService);
  }
}
