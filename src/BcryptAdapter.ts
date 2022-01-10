import bcrypt from 'bcrypt';
import IHashComparer from './IHashComparer';

export default class BcryptAdapter implements IHashComparer{
  constructor(readonly salt: number) {
    this.salt = salt;
  }

  compare(plainText: string, encryptedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, encryptedText);
  }

}