import AppError from '@shared/errors/AppError';

import FakeUserCodesAuthRepository from '../repositories/fakes/FakeUserCodesAuthRepository';

import AuthenticateRegisterUserService from './AuthenticateRegisterUserService';

let fakeUserCodesAuthRepository: FakeUserCodesAuthRepository;
let authenticateRegisterUser: AuthenticateRegisterUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserCodesAuthRepository = new FakeUserCodesAuthRepository();

    authenticateRegisterUser = new AuthenticateRegisterUserService(
      fakeUserCodesAuthRepository,
    );
  });

  it('should be able to authenticate register a new user with e-mail used', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    const authorization = await authenticateRegisterUser.execute({
      email: 'johndoe@email.com',
      code_auth,
    });

    expect(authorization).toBeTruthy();
  });

  it('should not be able to authenticate register a new user with authentication code wrong', async () => {
    await fakeUserCodesAuthRepository.create('johndoe@plific.com');

    await expect(
      authenticateRegisterUser.execute({
        email: 'johndoe@email.com',
        code_auth: 'wrong-authentication-code',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate register a new user if passed more than 30 minutes', async () => {
    const { code_auth } = await fakeUserCodesAuthRepository.create(
      'johndoe@email.com',
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setMinutes(customDate.getMinutes() + 31);
    });

    await expect(
      authenticateRegisterUser.execute({
        email: 'johndoe@email.com',
        code_auth,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
