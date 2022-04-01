/* eslint-disable no-empty-function */
import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IUsersCodeAuthRepository from '../repositories/IUsersCodesAuthRepository';

interface IRequest {
  email: string;
  code_auth: string;
}

interface IResponse {
  message: string;
}

@injectable()
class AuthenticateSignUpService {
  constructor(
    @inject('UsersCodeRepository')
    private usersCodeAuthRepository: IUsersCodeAuthRepository,
  ) {}

  public async execute({ email, code_auth }: IRequest): Promise<IResponse> {
    const validate_code_auth =
      await this.usersCodeAuthRepository.findByEmailAndCodeAuth(
        email,
        code_auth,
      );

    if (!validate_code_auth) {
      throw new AppError('Code auth is incorrect', 404);
    }

    if (differenceInMinutes(Date.now(), validate_code_auth.created_at) > 30) {
      throw new AppError('Authentication code expired', 403);
    }

    return {
      message: 'Code authenticated',
    };
  }
}

export default AuthenticateSignUpService;
