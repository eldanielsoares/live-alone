import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashPayload = await hash(payload, 8);

    return hashPayload;
  }

  public async compareHash(
    payload: string,
    cryptoPayload: string,
  ): Promise<boolean> {
    const matchedPassword = await compare(payload, cryptoPayload);

    return matchedPassword;
  }
}

export default HashProvider;
