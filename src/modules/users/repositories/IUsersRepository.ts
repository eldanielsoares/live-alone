/* eslint-disable no-unused-vars */
import ICreateUsersDTO from '../dtos/ICreateUserDTO';
import ISessionsDTO from '../dtos/ISessionsDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByEmail(data: ISessionsDTO): Promise<User | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
}
