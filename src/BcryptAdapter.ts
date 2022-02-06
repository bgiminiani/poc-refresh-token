import bcrypt from 'bcrypt';
import IEncrypter from './IEncrypter';

export default class BcryptAdapter implements IEncrypter{
  constructor(readonly salt: number) {
    this.salt = salt;
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }

  async encrypt(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt);
  }

}