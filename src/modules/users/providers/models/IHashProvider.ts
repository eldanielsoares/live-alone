export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, cryptoPayload: string): Promise<boolean>;
}
