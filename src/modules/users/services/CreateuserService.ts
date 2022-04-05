/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import ITokenJwtProvider from '../providers/models/ITokenJwtProvider';
import IUsersCodeAuthRepository from '../repositories/IUsersCodesAuthRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
  accepted_terms: boolean;
  code_auth: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersCodeRepository')
    private userCodeRepository: IUsersCodeAuthRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenJwtProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    accepted_terms,
    code_auth,
  }: IRequestDTO): Promise<IResponse> {
    const checkUserExists = await this.userRepository.findByEmail({ email });

    if (checkUserExists) {
      throw new AppError('E-mail already in use');
    }

    if (!accepted_terms) {
      throw new AppError('Terms must be accepted');
    }

    const findAutheticateSignUp =
      await this.userCodeRepository.findByEmailAndCodeAuth(email, code_auth);

    if (!findAutheticateSignUp) {
      throw new AppError('Invalid authentication code.', 401);
    }

    if (
      differenceInMinutes(Date.now(), findAutheticateSignUp.created_at) > 30
    ) {
      throw new AppError('Authentication code expired', 403);
    }

    const hashedPassowrd = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassowrd,
      accepted_terms,
    });

    const token = this.tokenProvider.sign({
      secret: auth.jwt.secret,
      expiresIn: auth.jwt.expiresIn,
      id: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateUserService;
