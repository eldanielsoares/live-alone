import ICreateUpdateFinancialProfileDTO from '@modules/financial_profile/dtos/ICreateUpdateFinancialProfileDTO';
import FinancialProfile from '@modules/financial_profile/infra/typeorm/entities/FinancialProfile';
import { v4 } from 'uuid';
import IFinancialProfileRepository from '../IFinancialProfileRepository';

class FakeFinancialProfileRepository implements IFinancialProfileRepository {
  private financialProfile: FinancialProfile[] = [];

  public async create(
    data: ICreateUpdateFinancialProfileDTO,
  ): Promise<FinancialProfile> {
    const financialProfile = new FinancialProfile();
    Object.assign(financialProfile, { id: v4() }, data);

    this.financialProfile.push(financialProfile);
    return financialProfile;
  }

  public async update(
    financialProfile: FinancialProfile,
  ): Promise<FinancialProfile> {
    const findFinancialProfile = this.financialProfile.findIndex(
      findIndex => findIndex.user_id === financialProfile.user_id,
    );

    this.financialProfile[findFinancialProfile] = financialProfile;

    return financialProfile;
  }

  public async findByUserId(id: string): Promise<FinancialProfile | undefined> {
    const financialProfile = this.financialProfile.find(
      findIndex => findIndex.user_id === id,
    );
    return financialProfile;
  }
}

export default FakeFinancialProfileRepository;
