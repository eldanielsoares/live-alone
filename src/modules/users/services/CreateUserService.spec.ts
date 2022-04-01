import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersCodeAuthRepository from '../repositories/fakes/FakeUserCodesAuthRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateuserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserCodesAuthRepository: FakeUsersCodeAuthRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserCodesAuthRepository = new FakeUsersCodeAuthRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserCodesAuthRepository,
    );
  });

  it('should be able to create an user', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    const user = await createUser.execute({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '1234',
      accepted_terms: true,
      code_auth,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with a existing email', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    await createUser.execute({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '1234',
      accepted_terms: true,
      code_auth,
    });

    expect(
      createUser.execute({
        name: 'john doe',
        email: 'johndoe@email.com',
        password: '1234',
        accepted_terms: true,
        code_auth,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user without accept terms', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    expect(
      createUser.execute({
        name: 'john doe',
        email: 'johndoe@email.com',
        password: '1234',
        accepted_terms: false,
        code_auth,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with a wrong code auth', async () => {
    expect(
      createUser.execute({
        name: 'john doe',
        email: 'johndoe@email.com',
        password: '1234',
        accepted_terms: true,
        code_auth: 'wrong-code-auth',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with a wrong code auth', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setMinutes(customDate.getMinutes() + 31);
    });
    expect(
      createUser.execute({
        name: 'john doe',
        email: 'johndoe@email.com',
        password: '1234',
        accepted_terms: true,
        code_auth,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
