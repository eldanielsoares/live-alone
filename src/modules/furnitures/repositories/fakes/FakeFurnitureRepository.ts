import ICreateFurnitureDTO from '@modules/furnitures/dtos/ICreateFurnitureDTO';
import Furnitures from '@modules/furnitures/infra/typeorm/entities/Furnitures';
import { v4 } from 'uuid';
import IFurnitureRepository from '../IFurnituresRepository';

class FakeFurnitureRepository implements IFurnitureRepository {
  private furnitures: Furnitures[] = [];

  public async create(data: ICreateFurnitureDTO): Promise<Furnitures> {
    const furniture = new Furnitures();

    Object.assign(furniture, { id: v4() }, data);

    this.furnitures.push(furniture);

    return furniture;
  }

  public async showAllFurnitures(user_id: string): Promise<Furnitures[]> {
    const furnitures = this.furnitures.filter(
      furnitures_id => furnitures_id.user_id === user_id,
    );

    return furnitures;
  }

  public async findById(id: string): Promise<Furnitures | undefined> {
    const furnitures = this.furnitures.find(
      furnitures_id => furnitures_id.id === id,
    );

    return furnitures;
  }

  public async update(furnitures: Furnitures): Promise<Furnitures> {
    const furnituresIndex = this.furnitures.findIndex(
      furnitures_id => furnitures_id.id === furnitures.id,
    );

    this.furnitures[furnituresIndex] = furnitures;

    return furnitures;
  }

  public async delete(furnitures: Furnitures): Promise<string> {
    const furnituresIndex = this.furnitures.findIndex(
      furnitures_id => furnitures_id.id === furnitures.id,
    );

    this.furnitures.splice(furnituresIndex, 1);

    return 'Furniture removed successfully';
  }
}

export default FakeFurnitureRepository;
