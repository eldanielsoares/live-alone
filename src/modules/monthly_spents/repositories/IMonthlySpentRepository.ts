import ICreateMonthlySpentDTO from '../dtos/ICreateMonthlySpentDTO';
import MonthlySpents from '../infra/typeorm/entities/MonthlySpents';

export default interface IMonthlySpentRepository {
  create(data: ICreateMonthlySpentDTO): Promise<MonthlySpents>;
  delete(month_spent: MonthlySpents): Promise<string>;
  list(user_id: string, type: string): Promise<MonthlySpents[]>;
  findById(id: string): Promise<MonthlySpents | undefined>;
}
