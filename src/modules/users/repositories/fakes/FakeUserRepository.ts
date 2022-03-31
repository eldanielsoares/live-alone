import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import ISessionsDTO from '@modules/users/dtos/ISessionsDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { v4 } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private user: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, data);

    this.user.push(user);

    return user;
  }

  public async findByEmail({ email }: ISessionsDTO): Promise<User | undefined> {
    const user = this.user.find(findUser => findUser.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.user.find(findUser => findUser.id === id);

    return user;
  }
}

export default FakeUsersRepository;
