import { sign } from 'jsonwebtoken';
import ITokenJwtDTO from '@modules/users/dtos/ITokenJwtDTO';
import ITokenJwtProvider from '../models/ITokenJwtProvider';

class TokenJwtProvider implements ITokenJwtProvider {
  sign({ secret, id, expiresIn }: ITokenJwtDTO): string {
    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return token;
  }
}

export default TokenJwtProvider;
