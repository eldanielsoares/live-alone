import ICreateFurnitureDTO from '../dtos/ICreateFurnitureDTO';
import Furnitures from '../infra/typeorm/entities/Furnitures';

export default interface IFurnitureRepository {
  create(data: ICreateFurnitureDTO): Promise<Furnitures>;
  showAllFurnitures(user_id: string): Promise<Furnitures[]>;
  findById(id: string): Promise<Furnitures | undefined>;
  update(furnitures: Furnitures): Promise<Furnitures>;
  delete(furnitures: Furnitures): Promise<string>;
}
