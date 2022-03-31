import AppError from '@shared/errors/AppError';
import FakeMonthlySpentRepository from '../repositories/fakes/FakeMonthlySpentRepository';
import CreateMonthlySpentService from './CreateMonthlySpentService';
import ListByTypeService from './ListByTypeService';

describe('CreateMonthlySpentService', () => {
  it('it should be able to list a monthlySpentService', async () => {
    const fakeMonthlyRepository = new FakeMonthlySpentRepository();

    const createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );

    const listByTypeMonthlySpentService = new ListByTypeService(
      fakeMonthlyRepository,
    );

    const monthlySpents = await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      value: 25,
    });

    const monthlySpentList = [];

    monthlySpentList.push(monthlySpents);

    const listByType = await listByTypeMonthlySpentService.execute(
      '1234',
      'fixed',
    );

    expect(listByType).toEqual(monthlySpentList);
  });

  it('it should not be able to list a non existent monthlySpentService', async () => {
    const fakeMonthlyRepository = new FakeMonthlySpentRepository();

    const createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );

    const listByTypeMonthlySpentService = new ListByTypeService(
      fakeMonthlyRepository,
    );

    await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      value: 25,
    });

    expect(
      listByTypeMonthlySpentService.execute('123', 'fixed'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
