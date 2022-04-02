import ICreateUpdateFinancialProfileDTO from '@modules/financial_profile/dtos/ICreateUpdateFinancialProfileDTO';
import IFinancialProfileRepository from '@modules/financial_profile/repositories/IFinancialProfileRepository';
import { getRepository, Repository } from 'typeorm';
import FinancialProfile from '../entities/FinancialProfile';

class FinancialProfileRepository implements IFinancialProfileRepository {
  private ormRepository: Repository<FinancialProfile>;

  constructor() {
    this.ormRepository = getRepository(FinancialProfile);
  }

  public async create(
    data: ICreateUpdateFinancialProfileDTO,
  ): Promise<FinancialProfile> {
    const financialProfile = this.ormRepository.create(data);

    await this.ormRepository.save(financialProfile);
    return financialProfile;
  }

  public async update(
    financialProfile: FinancialProfile,
  ): Promise<FinancialProfile> {
    const financialProfileUpdate = await this.ormRepository.save(
      financialProfile,
    );

    return financialProfileUpdate;
  }

  public async findByUserId(id: string): Promise<FinancialProfile | undefined> {
    const financialProfile = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return financialProfile;
  }

  public async getFinancialProfile(
    user_id: string,
  ): Promise<FinancialProfile | undefined> {
    const financialProfile = await this.ormRepository.findOne({
      where: { user_id },
    });

    return financialProfile;
  }
}

export default FinancialProfileRepository;
