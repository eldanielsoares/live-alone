import FakeFurnitureRepository from '../repositories/fakes/FakeFurnitureRepository';
import ShowAllFurnitureService from './ShowAllFurnituresService';

let fakeFurnitureRepository: FakeFurnitureRepository;
let showAllFurnitureService: ShowAllFurnitureService;

describe('ShowAllFurnitureService', () => {
  beforeEach(() => {
    fakeFurnitureRepository = new FakeFurnitureRepository();

    showAllFurnitureService = new ShowAllFurnitureService(
      fakeFurnitureRepository,
    );
  });
  it('it should be able to create a furniture', async () => {
    const createFurniture = await fakeFurnitureRepository.create({
      price: 1,
      bought: true,
      name: 'furniture',
      user_id: '1234',
    });

    const list = [];

    list.push(createFurniture);

    const furnitures = await showAllFurnitureService.execute('1234');

    expect(furnitures).toEqual(list);
  });
});
