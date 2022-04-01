import AppError from '@shared/errors/AppError';
import FakeMonthlySpentRepository from '../repositories/fakes/FakeMonthlySpentRepository';
import CreateMonthlySpentService from './CreateMonthlySpentService';
import ListByTypeService from './ListByTypeService';

let fakeMonthlyRepository: FakeMonthlySpentRepository;
let createMonthlySpentService: CreateMonthlySpentService;
let listByTypeMonthlySpentService: ListByTypeService;

describe('CreateMonthlySpentService', () => {
  beforeEach(() => {
    fakeMonthlyRepository = new FakeMonthlySpentRepository();

    createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );

    listByTypeMonthlySpentService = new ListByTypeService(
      fakeMonthlyRepository,
    );
  });

  it('it should be able to list a monthlySpentService', async () => {
    const monthlySpents = await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      amount: 25,
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
    await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      amount: 25,
    });

    expect(
      listByTypeMonthlySpentService.execute('123', 'fixed'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
