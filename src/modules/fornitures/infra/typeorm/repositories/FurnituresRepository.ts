import ICreateFurnitureDTO from '@modules/fornitures/dtos/ICreateFurnitureDTO';
import IFurnitureRepository from '@modules/fornitures/repositories/IFurnituresRepository';
import { getRepository, Repository } from 'typeorm';
import Furnitures from '../entities/Furnitures';

class FurnitureRepository implements IFurnitureRepository {
  private ormRepository: Repository<Furnitures>;

  constructor() {
    this.ormRepository = getRepository(Furnitures);
  }

  public async create(data: ICreateFurnitureDTO): Promise<Furnitures> {
    const furniture = this.ormRepository.create(data);

    await this.ormRepository.save(furniture);

    return furniture;
  }

  public async showAllFurnitures(user_id: string): Promise<Furnitures[]> {
    const furnitures = await this.ormRepository.find({
      where: { user_id },
    });

    return furnitures;
  }

  public async findById(id: string): Promise<Furnitures | undefined> {
    const furnitures = await this.ormRepository.findOne({
      where: { id },
    });

    return furnitures;
  }

  public async update(furnitures: Furnitures): Promise<Furnitures> {
    const furniture = this.ormRepository.create(furnitures);

    await this.ormRepository.save(furniture);

    return furniture;
  }

  public async delete(furnitures: Furnitures): Promise<string> {
    await this.ormRepository.remove(furnitures);

    return 'Furniture removed successfully';
  }
}

export default FurnitureRepository;
