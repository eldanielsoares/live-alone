/* eslint-disable no-empty-function */
import { inject, injectable } from 'tsyringe';
import ICreateFurnitureDTO from '../dtos/ICreateFurnitureDTO';
import Furnitures from '../infra/typeorm/entities/Furnitures';
import IFurnitureRepository from '../repositories/IFurnituresRepository';

@injectable()
class CreateFurnitureService {
  constructor(
    @inject('FurnitureRepository')
    private furnitureRepository: IFurnitureRepository,
  ) {}

  public async execute(data: ICreateFurnitureDTO): Promise<Furnitures> {
    const furniture = await this.furnitureRepository.create(data);

    return furniture;
  }
}

export default CreateFurnitureService;
