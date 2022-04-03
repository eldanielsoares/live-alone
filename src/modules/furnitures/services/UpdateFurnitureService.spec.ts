import AppError from '@shared/errors/AppError';
import FakeFurnitureRepository from '../repositories/fakes/FakeFurnitureRepository';
import UpdateFurnitureService from './UpdateFurnitureService';

let fakeFurnitureRepository: FakeFurnitureRepository;
let updateFurnitureService: UpdateFurnitureService;

describe('DeleteFurnitureService', () => {
  beforeEach(() => {
    fakeFurnitureRepository = new FakeFurnitureRepository();

    updateFurnitureService = new UpdateFurnitureService(
      fakeFurnitureRepository,
    );
  });
  it('it should be able to update a furniture', async () => {
    const furniture = await fakeFurnitureRepository.create({
      price: 1,
      bought: true,
      name: 'furniture',
      user_id: '1234',
    });

    const updateFurniture = await updateFurnitureService.execute(
      {
        price: 2,
        bought: false,
        name: 'furniture',
        user_id: '1234',
      },
      furniture.id,
    );

    expect(updateFurniture).toHaveProperty('id');
  });

  it('it should not be able to delete a not found furniture', async () => {
    expect(
      updateFurnitureService.execute(
        {
          price: 2,
          bought: false,
          name: 'furniture',
          user_id: '1234',
        },
        'not-found-id',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
