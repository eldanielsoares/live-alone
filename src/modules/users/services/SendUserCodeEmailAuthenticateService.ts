/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersCodeAuthRepository from '../repositories/IUsersCodesAuthRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class SendUserCodeEmailAuthenticateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersCodeRepository')
    private usersCodesRepository: IUsersCodeAuthRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const checkEmailExists = await this.usersRepository.findByEmail({ email });

    if (checkEmailExists) {
      throw new AppError('Email already in use');
    }

    const { code_auth } = await this.usersCodesRepository.create(email);

    console.log(code_auth);
  }
}

export default SendUserCodeEmailAuthenticateService;
