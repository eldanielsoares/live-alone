import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeTokenJwtProvider from '../providers/fakes/FakeTokenJwtProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateService from './AutheticateService';
import CreateUserService from './CreateuserService';

describe('AuthenticateService', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenJwtProvider();

    const createService = new CreateUserService(
      fakeUserRepository,
      fakehashProvider,
    );

    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakehashProvider,
      fakeTokenProvider,
    );

    const user = await createService.execute({
      name: 'johndoe@email.com',
      email: 'John Doe',
      password: '1234',
    });

    const response = await authenticateService.execute({
      email: 'John Doe',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an not existing user ', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenJwtProvider();

    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakehashProvider,
      fakeTokenProvider,
    );

    expect(
      authenticateService.execute({
        email: 'John Doe',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with a wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakehashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenJwtProvider();

    const createService = new CreateUserService(
      fakeUserRepository,
      fakehashProvider,
    );

    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakehashProvider,
      fakeTokenProvider,
    );

    await createService.execute({
      name: 'johndoe@email.com',
      email: 'John Doe',
      password: '1234',
    });

    expect(
      authenticateService.execute({
        email: 'John Doe',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
