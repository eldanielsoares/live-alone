import FakeMonthlySpentRepository from '../repositories/fakes/FakeMonthlySpentRepository';
import CreateMonthlySpentService from './CreateMonthlySpentService';

describe('CreateMonthlySpentService', () => {
  it('it should be able to create a monthlySpentService', async () => {
    const fakeMonthlyRepository = new FakeMonthlySpentRepository();

    const createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );

    const monthlySpents = await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      value: 25,
    });

    expect(monthlySpents).toHaveProperty('id');
  });
});
