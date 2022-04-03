/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFurnitureRepository from '../repositories/IFurnituresRepository';

@injectable()
class DeleteFurnitureService {
  constructor(
    @inject('FurnitureRepository')
    private furnitureRepository: IFurnitureRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const furniture = await this.furnitureRepository.findById(id);

    if (!furniture) {
      throw new AppError('Furniture not found', 404);
    }

    const deleteFurniture = await this.furnitureRepository.delete(furniture);

    return deleteFurniture;
  }
}

export default DeleteFurnitureService;
