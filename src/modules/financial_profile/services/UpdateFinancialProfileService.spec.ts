import AppError from '@shared/errors/AppError';
import FakeFinancialProfileRepository from '../repositories/fakes/FakeFinancialProfileRepository';
import CreateFinancialProfileService from './CreateFinancialProfileService';
import UpdateFinancialProfileService from './UpdateFinancialProfileService';

let fakeFinancialProfileRepository: FakeFinancialProfileRepository;
let createFinancialProfileService: CreateFinancialProfileService;
let updateFinancialProfileService: UpdateFinancialProfileService;

describe('UpdateFinancialProfileService', () => {
  beforeEach(() => {
    fakeFinancialProfileRepository = new FakeFinancialProfileRepository();

    createFinancialProfileService = new CreateFinancialProfileService(
      fakeFinancialProfileRepository,
    );

    updateFinancialProfileService = new UpdateFinancialProfileService(
      fakeFinancialProfileRepository,
    );
  });
  it('it should be able to update a financialProfile', async () => {
    const financialProfile = await createFinancialProfileService.execute({
      monthly_income: 800,
      monthly_spent: 400,
      job_type: 'entrepreneur',
      current_emergency_reserve: 1800,
      user_id: '1234',
    });

    const updateFinancialProfile = await updateFinancialProfileService.execute(
      financialProfile,
    );

    expect(updateFinancialProfile).toHaveProperty('id');
  });

  it('it should not be able to update a non existing financialProfile', async () => {
    expect(
      updateFinancialProfileService.execute({
        monthly_income: 800,
        monthly_spent: 400,
        job_type: 'entrepreneur',
        current_emergency_reserve: 1800,
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
