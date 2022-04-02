import FakeFinancialProfileRepository from '../repositories/fakes/FakeFinancialProfileRepository';
import CreateFinancialProfileService from './CreateFinancialProfileService';

let fakeFinancialProfileRepository: FakeFinancialProfileRepository;
let createFinancialProfileService: CreateFinancialProfileService;

describe('CreateFinancialProfileService', () => {
  beforeEach(() => {
    fakeFinancialProfileRepository = new FakeFinancialProfileRepository();

    createFinancialProfileService = new CreateFinancialProfileService(
      fakeFinancialProfileRepository,
    );
  });
  it('it should be able to create a financialProfile', async () => {
    const financialProfile = await createFinancialProfileService.execute({
      monthly_income: 800,
      monthly_spent: 400,
      job_type: 'entrepreneur',
      current_emergency_reserve: 1800,
      user_id: '1234',
    });

    expect(financialProfile).toHaveProperty('id');
  });
});
