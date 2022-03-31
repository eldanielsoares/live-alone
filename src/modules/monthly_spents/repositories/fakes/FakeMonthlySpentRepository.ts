import { v4 } from 'uuid';
import ICreateMonthlySpentDTO from '@modules/monthly_spents/dtos/ICreateMonthlySpentDTO';
import MonthlySpents from '@modules/monthly_spents/infra/typeorm/entities/MonthlySpents';
import IMonthlySpentRepository from '@modules/monthly_spents/repositories/IMonthlySpentRepository';

class FakeMonthlySpentRepository implements IMonthlySpentRepository {
  private monthlySpent: MonthlySpents[] = [];

  public async create(data: ICreateMonthlySpentDTO): Promise<MonthlySpents> {
    const monthly_spent = new MonthlySpents();

    Object.assign(monthly_spent, { id: v4() }, data);

    this.monthlySpent.push(monthly_spent);

    return monthly_spent;
  }

  public async delete(monthlySpents: MonthlySpents): Promise<string> {
    const monthlySpentIndex = this.monthlySpent.findIndex(
      monthlySpent => monthlySpent.id === monthlySpents.id,
    );

    this.monthlySpent.splice(monthlySpentIndex, 1);

    return 'spent delete successfully';
  }

  public async list(user_id: string, type: string): Promise<MonthlySpents[]> {
    const filteredMonthlySpent = this.monthlySpent.filter(
      monthlySpentFilter =>
        monthlySpentFilter.user_id === user_id &&
        monthlySpentFilter.type === type,
    );

    return filteredMonthlySpent;
  }

  public async findById(id: string): Promise<MonthlySpents | undefined> {
    const month_spents = this.monthlySpent.find(
      monthly_id => monthly_id.id === id,
    );

    return month_spents;
  }
}

export default FakeMonthlySpentRepository;
