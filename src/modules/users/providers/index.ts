import { container } from 'tsyringe';
import HashProvider from './implementations/HashProvider';
import TokenJwtProvider from './implementations/TokenJwtProvider';
import IHashProvider from './models/IHashProvider';
import ITokenJwtProvider from './models/ITokenJwtProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<ITokenJwtProvider>(
  'TokenProvider',
  TokenJwtProvider,
);
