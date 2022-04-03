import CreateFurnitureService from '@modules/fornitures/services/CreateFurnituresService';
import DeleteFurnitureService from '@modules/fornitures/services/DeleteFurnitureService';
import ShowAllFurnitureService from '@modules/fornitures/services/ShowAllFurnituresService';
import UpdateFurnitureService from '@modules/fornitures/services/UpdateFurnitureService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FurnituresControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { price, bought, name } = request.body;

    const createFurnitureService = container.resolve(CreateFurnitureService);

    const furniture = await createFurnitureService.execute({
      price,
      bought,
      name,
      user_id: id,
    });

    return response.json(furniture);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteFurnitureService = container.resolve(DeleteFurnitureService);

    const furniture = await deleteFurnitureService.execute(String(id));

    return response.json(furniture);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showAllFurnitureService = container.resolve(ShowAllFurnitureService);

    const furniture = await showAllFurnitureService.execute(String(id));

    return response.json(furniture);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { price, bought, name } = request.body;

    const createFurnitureService = container.resolve(UpdateFurnitureService);

    const furniture = await createFurnitureService.execute(
      { price, bought, name, user_id: id },
      String(request.query.id),
    );

    return response.json(furniture);
  }
}
