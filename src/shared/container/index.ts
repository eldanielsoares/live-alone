import { container } from 'tsyringe';
import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMonthlySpentRepository from '@modules/monthly_spents/repositories/IMonthlySpentRepository';
import MonthlySpentRepository from '@modules/monthly_spents/infra/typeorm/repositories/MonthSpentRepository';
import IUsersCodeAuthRepository from '@modules/users/repositories/IUsersCodesAuthRepository';
import UsersCodeAuthRepository from '@modules/users/infra/typeorm/repositories/UsersCodesAuthRepository';
import IFinancialProfileRepository from '@modules/financial_profile/repositories/IFinancialProfileRepository';
import FinancialProfileRepository from '@modules/financial_profile/infra/typeorm/repositories/FinancialProfileRepository';
import IFurnitureRepository from '@modules/fornitures/repositories/IFurnituresRepository';
import FurnitureRepository from '@modules/fornitures/infra/typeorm/repositories/FurnituresRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersCodeAuthRepository>(
  'UsersCodeRepository',
  UsersCodeAuthRepository,
);

container.registerSingleton<IMonthlySpentRepository>(
  'MonthlySpentsRepository',
  MonthlySpentRepository,
);

container.registerSingleton<IFinancialProfileRepository>(
  'FinancialProfileRepository',
  FinancialProfileRepository,
);

container.registerSingleton<IFurnitureRepository>(
  'FurnitureRepository',
  FurnitureRepository,
);
