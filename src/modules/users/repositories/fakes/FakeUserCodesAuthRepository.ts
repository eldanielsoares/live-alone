import IUsersCodeAuthRepository from '@modules/users/repositories/IUsersCodesAuthRepository';
import UserCodesAuth from '@modules/users/infra/typeorm/entities/UsersCodesAuth';
import { v4 } from 'uuid';

class FakeUsersCodeAuthRepository implements IUsersCodeAuthRepository {
  private userCodeAuth: UserCodesAuth[] = [];

  public async create(email: string): Promise<UserCodesAuth> {
    const user_auth = new UserCodesAuth();

    Object.assign(user_auth, {
      id: v4(),
      code_auth: '1234',
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userCodeAuth.push(user_auth);

    return user_auth;
  }

  public async findByEmailAndCodeAuth(
    email: string,
    code_auth: string,
  ): Promise<UserCodesAuth | undefined> {
    const userCodeAuth = this.userCodeAuth.find(findCodeAuth => {
      if (
        findCodeAuth.code_auth === code_auth &&
        findCodeAuth.email === email
      ) {
        return findCodeAuth;
      }
      return undefined;
    });

    return userCodeAuth;
  }
}

export default FakeUsersCodeAuthRepository;
