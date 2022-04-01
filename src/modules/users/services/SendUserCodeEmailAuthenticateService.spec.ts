import AppError from '@shared/errors/AppError';
import FakeUsersCodeAuthRepository from '../repositories/fakes/FakeUserCodesAuthRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import SendUserCodeEmailAuthenticateService from './SendUserCodeEmailAuthenticateService';

let fakeUserRepository: FakeUsersRepository;
let fakeUsersCodesRepository: FakeUsersCodeAuthRepository;
let sendUserCodeEmailAuthenticateService: SendUserCodeEmailAuthenticateService;

describe('SendUserCodeEmailAuthenticateService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUsersCodesRepository = new FakeUsersCodeAuthRepository();

    sendUserCodeEmailAuthenticateService =
      new SendUserCodeEmailAuthenticateService(
        fakeUserRepository,
        fakeUsersCodesRepository,
      );
  });

  it('should be able to generate a code confirmation', async () => {
    const sendMail = jest.spyOn(fakeUsersCodesRepository, 'create');
    await sendUserCodeEmailAuthenticateService.execute('johndoe@email.com');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to generate a code confirmation with an email in use', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@plific.com',
      password: '1234',
      accepted_terms: true,
    });

    await expect(
      sendUserCodeEmailAuthenticateService.execute('johndoe@plific.com'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
