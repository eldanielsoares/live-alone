/* eslint-disable no-empty-function */
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import ITokenJwtProvider from '../providers/models/ITokenJwtProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenJwtProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail({ email });

    if (!user) {
      throw new AppError('email/password incorrect');
    }

    const matchedPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!matchedPassword) {
      throw new AppError('email/password incorrect');
    }

    const token = this.tokenProvider.sign({
      secret: auth.jwt.secret,
      expiresIn: auth.jwt.expiresIn,
      id: user.id,
    });

    return { user, token };
  }
}

export default AuthenticateService;
