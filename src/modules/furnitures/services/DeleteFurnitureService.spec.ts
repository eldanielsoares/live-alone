import AppError from '@shared/errors/AppError';
import FakeFurnitureRepository from '../repositories/fakes/FakeFurnitureRepository';
import DeleteFurnitureService from './DeleteFurnitureService';

let fakeFurnitureRepository: FakeFurnitureRepository;
let deleteFurnitureService: DeleteFurnitureService;

describe('DeleteFurnitureService', () => {
  beforeEach(() => {
    fakeFurnitureRepository = new FakeFurnitureRepository();

    deleteFurnitureService = new DeleteFurnitureService(
      fakeFurnitureRepository,
    );
  });
  it('it should be able to delete a furniture', async () => {
    const furniture = await fakeFurnitureRepository.create({
      price: 1,
      bought: true,
      name: 'furniture',
      user_id: '1234',
    });

    const deleteFurniture = await deleteFurnitureService.execute(furniture.id);

    expect(deleteFurniture).toBe('Furniture removed successfully');
  });

  it('it should not be able to delete a not found furniture', async () => {
    expect(
      deleteFurnitureService.execute('not-found-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
