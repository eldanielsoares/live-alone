import FakeFurnitureRepository from '../repositories/fakes/FakeFurnitureRepository';
import CreateFurnitureService from './CreateFurnituresService';

let fakeFurnitureRepository: FakeFurnitureRepository;
let createFurnitureService: CreateFurnitureService;

describe('CreateFurnitureService', () => {
  beforeEach(() => {
    fakeFurnitureRepository = new FakeFurnitureRepository();

    createFurnitureService = new CreateFurnitureService(
      fakeFurnitureRepository,
    );
  });
  it('it should be able to create a furniture', async () => {
    const furniture = await createFurnitureService.execute({
      price: 1,
      bought: true,
      name: 'furniture',
      user_id: '1234',
    });
    expect(furniture).toHaveProperty('id');
  });
});
