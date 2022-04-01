import IUsersCodeAuthRepository from '@modules/users/repositories/IUsersCodesAuthRepository';
import { getRepository, Repository } from 'typeorm';
import crypto from 'crypto';
import UserCodesAuth from '../entities/UsersCodesAuth';

class UsersCodeAuthRepository implements IUsersCodeAuthRepository {
  private ormRepository: Repository<UserCodesAuth>;

  constructor() {
    this.ormRepository = getRepository(UserCodesAuth);
  }

  public async create(email: string): Promise<UserCodesAuth> {
    const code_auth = crypto
      .randomBytes(5)
      .toString('hex')
      .substring(0, 5)
      .toUpperCase();
    const code_auth_generate = this.ormRepository.create({
      email,
      code_auth,
    });

    await this.ormRepository.save(code_auth_generate);
    return code_auth_generate;
  }

  public async findByEmailAndCodeAuth(
    email: string,
    code_auth: string,
  ): Promise<UserCodesAuth | undefined> {
    const find_code_auth = await this.ormRepository.findOne({
      where: { email, code_auth },
    });
    return find_code_auth;
  }
}

export default UsersCodeAuthRepository;
