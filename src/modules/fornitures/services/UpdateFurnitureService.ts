/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateFurnitureDTO from '../dtos/ICreateFurnitureDTO';
import Furnitures from '../infra/typeorm/entities/Furnitures';
import IFurnitureRepository from '../repositories/IFurnituresRepository';

@injectable()
class UpdateFurnitureService {
  constructor(
    @inject('FurnitureRepository')
    private furnitureRepository: IFurnitureRepository,
  ) {}

  public async execute(
    data: ICreateFurnitureDTO,
    id_furniture: string,
  ): Promise<Furnitures> {
    const furniture = await this.furnitureRepository.findById(id_furniture);

    if (!furniture) {
      throw new AppError('Furniture not found', 404);
    }

    Object.assign(furniture, data);

    const updateFurniture = await this.furnitureRepository.update(furniture);

    return updateFurniture;
  }
}

export default UpdateFurnitureService;
