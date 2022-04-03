/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import Furnitures from '../infra/typeorm/entities/Furnitures';
import IFurnitureRepository from '../repositories/IFurnituresRepository';

@injectable()
class ShowAllFurnitureService {
  constructor(
    @inject('FurnitureRepository')
    private furnitureRepository: IFurnitureRepository,
  ) {}

  public async execute(user_id: string): Promise<Furnitures[]> {
    const furniture = await this.furnitureRepository.showAllFurnitures(user_id);

    return furniture;
  }
}

export default ShowAllFurnitureService;
