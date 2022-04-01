import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeTokenJwtProvider from '../providers/fakes/FakeTokenJwtProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateService from './AutheticateService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenJwtProvider;
let authenticateUserService: AuthenticateService;

describe('AuthenticateService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenJwtProvider();

    authenticateUserService = new AuthenticateService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234',
      accepted_terms: true,
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@email.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'johndoe@email.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234',
      accepted_terms: true,
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
