import FakeMonthlySpentRepository from '../repositories/fakes/FakeMonthlySpentRepository';
import CreateMonthlySpentService from './CreateMonthlySpentService';

let fakeMonthlyRepository: FakeMonthlySpentRepository;
let createMonthlySpentService: CreateMonthlySpentService;

describe('CreateMonthlySpentService', () => {
  beforeEach(() => {
    fakeMonthlyRepository = new FakeMonthlySpentRepository();
    fakeMonthlyRepository = new FakeMonthlySpentRepository();

    createMonthlySpentService = new CreateMonthlySpentService(
      fakeMonthlyRepository,
    );
  });
  it('it should be able to create a monthlySpentService', async () => {
    const monthlySpents = await createMonthlySpentService.execute({
      name: 'spent',
      type: 'fixed',
      user_id: '1234',
      amount: 25,
    });

    expect(monthlySpents).toHaveProperty('id');
  });
});
