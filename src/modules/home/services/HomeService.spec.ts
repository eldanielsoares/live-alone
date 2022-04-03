import FakeMonthlySpentRepository from '@modules/monthly_spents/repositories/fakes/FakeMonthlySpentRepository';
import FakeFinancialProfileRepository from '@modules/financial_profile/repositories/fakes/FakeFinancialProfileRepository';
import FakeFurnitureRepository from '@modules/furnitures/repositories/fakes/FakeFurnitureRepository';
import HomeService from './HomeService';

let fakeMonthlySpentRepository: FakeMonthlySpentRepository;
let fakeFinancialProfileRepository: FakeFinancialProfileRepository;
let fakeFurnitureRepository: FakeFurnitureRepository;
let homeService: HomeService;

describe('HomeService', () => {
  beforeEach(async () => {
    fakeMonthlySpentRepository = new FakeMonthlySpentRepository();
    fakeFinancialProfileRepository = new FakeFinancialProfileRepository();
    fakeFurnitureRepository = new FakeFurnitureRepository();

    await fakeMonthlySpentRepository.create({
      name: 'test',
      amount: 10,
      type: 'fixed',
      user_id: '1234',
    });

    await fakeMonthlySpentRepository.create({
      name: 'test',
      amount: 10,
      type: 'variable',
      user_id: '1234',
    });

    await fakeFurnitureRepository.create({
      name: 'sofa',
      bought: false,
      price: 100,
      user_id: '1234',
    });

    homeService = new HomeService(
      fakeMonthlySpentRepository,
      fakeFinancialProfileRepository,
      fakeFurnitureRepository,
    );
  });

  it('should be able to show the home data', async () => {
    await fakeFinancialProfileRepository.create({
      monthly_income: 800,
      monthly_spent: 300,
      job_type: 'fixed_job',
      current_emergency_reserve: 1800,
      user_id: '1234',
    });
    const home = await homeService.execute('1234');

    expect(home).toHaveProperty('monthlySpentFixed');
    expect(home).toHaveProperty('totalMonthlySpentFixed');
    expect(home).toHaveProperty('monthlySpentVariable');
    expect(home).toHaveProperty('totalMonthlySpentVariable');
    expect(home).toHaveProperty('hasFinancialProfile');
    expect(home).toHaveProperty('emergency_reserve_recommended');
    expect(home).toHaveProperty('furnitures');
    expect(home).toHaveProperty('totalFurnitures');
  });

  it('should be able to show the home data with entrepreneur', async () => {
    await fakeFinancialProfileRepository.create({
      monthly_income: 800,
      monthly_spent: 300,
      job_type: 'entrepreneur',
      current_emergency_reserve: 1800,
      user_id: '1234',
    });
    const home = await homeService.execute('1234');

    expect(home).toHaveProperty('monthlySpentFixed');
    expect(home).toHaveProperty('totalMonthlySpentFixed');
    expect(home).toHaveProperty('monthlySpentVariable');
    expect(home).toHaveProperty('totalMonthlySpentVariable');
    expect(home).toHaveProperty('hasFinancialProfile');
    expect(home).toHaveProperty('emergency_reserve_recommended');
    expect(home).toHaveProperty('furnitures');
    expect(home).toHaveProperty('totalFurnitures');
  });
});
