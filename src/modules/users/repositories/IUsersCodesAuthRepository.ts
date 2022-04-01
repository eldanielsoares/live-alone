import UserCodesAuth from '../infra/typeorm/entities/UsersCodesAuth';

export default interface IUsersCodeAuthRepository {
  create(email: string): Promise<UserCodesAuth>;
  findByEmailAndCodeAuth(
    email: string,
    code_auth: string,
  ): Promise<UserCodesAuth | undefined>;
}
