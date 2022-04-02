import ICreateUpdateFinancialProfileDTO from '../dtos/ICreateUpdateFinancialProfileDTO';
import FinancialProfile from '../infra/typeorm/entities/FinancialProfile';

export default interface IFinancialProfileRepository {
  create(data: ICreateUpdateFinancialProfileDTO): Promise<FinancialProfile>;
  update(financialProfile: FinancialProfile): Promise<FinancialProfile>;
  findByUserId(id: string): Promise<FinancialProfile | undefined>;
}
