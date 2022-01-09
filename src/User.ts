import IEncrypter from "./IEncrypter";
import IValidatePassword from "./IValidatePassword";

export default class User implements IEncrypter, IValidatePassword {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  encryptedPassword: Promise<string>;

  constructor(email: string, password: string) {
    this.email = email; 
    this.password = password;
    this.encryptedPassword = this.encrypt(password);
    this.accessToken = '#@#$%ˆ&';
    this.refreshToken = '#@#$%ˆ&';
  }

  async encrypt(password: string): Promise<string> {
    const reversedPassword = password.split('').reverse().join('');
    return reversedPassword;
  }

  async isValid(password: string): Promise<boolean> {
    return await this.encrypt(password) === await this.encryptedPassword;
  }
}