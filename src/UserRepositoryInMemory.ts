import IUserRepository from "./IUserRepository";
import User from "./User";

export default class UserRepositoryInMemory implements IUserRepository {
  users: any[] ;

  constructor() {
    this.users = [
      {
        email: 'ana@mail.com',
        password: '$2b$10$JDiH9oI0p.665GfVUjYgo.ZWfF2j3PlRfuspH5SVz4TevB1Jqkky.',
        accessToken: '#@#$%ˆ&',
        refreshToken: '#@#$%ˆ&',
      },
    ];
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find(user => user.email === email);
    if (!findUser) return undefined;
    return new User(findUser.email, findUser.password);
  }
}