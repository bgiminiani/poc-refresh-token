import bcrypt from 'bcrypt';
import IEncrypter from "./IEncrypter";

export default class BcryptAdapter implements IEncrypter{
  constructor(readonly salt: number) {
    this.salt = salt;
  }

  compare(plainText: string, encryptedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, encryptedText);
  }

}