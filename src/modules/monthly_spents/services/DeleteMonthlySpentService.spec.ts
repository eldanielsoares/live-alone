import AppError from '@shared/errors/AppError';
import FakeMonthlySpentRepository from '../repositories/fakes/FakeMonthlySpentRepository';
import CreateMonthlySpentService from './CreateMonthlySpentService';
import DeleteMonthlySpentService from './DeleteMonthlySpentService';

let fakeMonthlyRepository: FakeMonthlySpentRepository;
let createMonthlySpentService: CreateMonthlySpentService;
let deleteMonthlySpentService: DeleteMonthlySpentService;

describe('DeleteMonthlySpentService', () => {
  beforeEach(() => {
    fakeMonthlyRepository = new FakeMonthlySpentRepository();

    createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );

    deleteMonthlySpentService = new DeleteMonthlySpentService(
      fakeMonthlyRepository,
    );
  });
  it('it should be able to delete a monthlySpent', async () => {
    const monthlySpents = await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      amount: 25,
    });

    const deleteMonthlySpent = await deleteMonthlySpentService.execute(
      monthlySpents.id,
    );

    expect(deleteMonthlySpent).toEqual('spent delete successfully');
  });

  it('it should not be able to delete a not existent monthlySpent', async () => {
    expect(deleteMonthlySpentService.execute('1234')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
