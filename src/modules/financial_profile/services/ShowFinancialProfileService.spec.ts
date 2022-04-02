import AppError from '@shared/errors/AppError';
import FakeFinancialProfileRepository from '../repositories/fakes/FakeFinancialProfileRepository';
import CreateFinancialProfileService from './CreateFinancialProfileService';
import ShowFinancialProfileService from './ShowFinancialProfileService';

let fakeFinancialProfileRepository: FakeFinancialProfileRepository;
let createFinancialProfileService: CreateFinancialProfileService;
let showFinancialProfileService: ShowFinancialProfileService;

describe('ShowFinancialProfileService', () => {
  beforeEach(() => {
    fakeFinancialProfileRepository = new FakeFinancialProfileRepository();

    createFinancialProfileService = new CreateFinancialProfileService(
      fakeFinancialProfileRepository,
    );

    showFinancialProfileService = new ShowFinancialProfileService(
      fakeFinancialProfileRepository,
    );
  });

  it('it should be able to show a financialProfile', async () => {
    await createFinancialProfileService.execute({
      monthly_income: 800,
      monthly_spent: 400,
      job_type: 'entrepreneur',
      current_emergency_reserve: 1800,
      user_id: '1234',
    });

    const showFinancialProfile = await showFinancialProfileService.execute(
      '1234',
    );

    expect(showFinancialProfile).toHaveProperty('id');
  });

  it('it should not be able to show a non exists financialProfile', async () => {
    expect(showFinancialProfileService.execute('1234')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
