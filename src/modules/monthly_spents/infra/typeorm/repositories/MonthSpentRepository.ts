import ICreateMonthlySpentDTO from '@modules/monthly_spents/dtos/ICreateMonthlySpentDTO';
import IMonthlySpentRepository from '@modules/monthly_spents/repositories/IMonthlySpentRepository';
import { getRepository, Repository } from 'typeorm';
import MonthlySpents from '../entities/MonthlySpents';

class MonthlySpentRepository implements IMonthlySpentRepository {
  private ormRepository: Repository<MonthlySpents>;

  constructor() {
    this.ormRepository = getRepository(MonthlySpents);
  }

  public async create(data: ICreateMonthlySpentDTO): Promise<MonthlySpents> {
    const monthly_spent = this.ormRepository.create(data);

    await this.ormRepository.save(monthly_spent);

    return monthly_spent;
  }

  public async delete(monthlySpents: MonthlySpents): Promise<string> {
    await this.ormRepository.remove(monthlySpents);

    return 'spent delete successfully';
  }

  public async list(user_id: string, type: string): Promise<MonthlySpents[]> {
    const month_spents = await this.ormRepository.find({
      where: { type, user_id },
    });

    return month_spents;
  }

  public async findById(id: string): Promise<MonthlySpents | undefined> {
    const month_spents = await this.ormRepository.findOne({
      where: { id },
    });

    return month_spents;
  }
}

export default MonthlySpentRepository;
