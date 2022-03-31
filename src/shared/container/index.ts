import { container } from 'tsyringe';
import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMonthlySpentRepository from '@modules/monthly_spents/repositories/IMonthlySpentRepository';
import MonthlySpentRepository from '@modules/monthly_spents/infra/typeorm/repositories/MonthSpentRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMonthlySpentRepository>(
  'MonthlySpentsRepository',
  MonthlySpentRepository,
);
