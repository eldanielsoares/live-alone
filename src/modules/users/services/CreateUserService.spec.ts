import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateuserService';

describe('CreateUserService', () => {
  it('should be able to create an user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();

    const createService = new CreateUserService(
      fakeUserRepository,
      fakehashProvider,
    );

    const user = await createService.execute({
      name: 'johndoe@email.com',
      email: 'John Doe',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with a existing email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();

    const createService = new CreateUserService(
      fakeUserRepository,
      fakehashProvider,
    );

    await createService.execute({
      name: 'johndoe@email.com',
      email: 'John Doe',
      password: '1234',
    });

    expect(
      createService.execute({
        name: 'johndoe@email.com',
        email: 'John Doe',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
