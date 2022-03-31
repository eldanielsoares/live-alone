import ITokenJwtDTO from '@modules/users/dtos/ITokenJwtDTO';
import ITokenJwtProvider from '../models/ITokenJwtProvider';

class FakeTokenJwtProvider implements ITokenJwtProvider {
  sign({ secret, id, expiresIn }: ITokenJwtDTO): string {
    const token = `${secret}${id}${expiresIn}`;

    return token;
  }
}

export default FakeTokenJwtProvider;
