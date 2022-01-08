import IEncrypter from "./IEncrypter";
import User from "./User";

export default class MakeLogin {
  users: { email: string; password: string; }[];
  encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter; 
    this.users = [
      {
        email: 'ana@mail.com',
        password: '12345',
      },
    ];
  }

  async execute(email: string, password: string) {
    const user = new User(email, password);
    const encryptedPassword = await this.encrypter.encrypt(user.password);
    const findUser: any = this.users.find(findUser => findUser.email === user.email && findUser.password === encryptedPassword);
    if (!findUser) throw new Error('User not found');
    const { accessToken, refreshToken } = user;
    return {
      email,
      accessToken,
      refreshToken,
    };
  }
}