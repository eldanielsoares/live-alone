import ITokenJwtDTO from '../../dtos/ITokenJwtDTO';

export default interface ITokenJwtProvider {
  sign(data: ITokenJwtDTO): string;
}
