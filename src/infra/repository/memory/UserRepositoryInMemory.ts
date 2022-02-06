import User from "../../../domain/entity/User";
import IUserRepository from "../../../domain/repository/IUserRepository";

export default class UserRepositoryInMemory implements IUserRepository {
  users: any[] ;

  constructor() {
    this.users = [
      {
        id: '123',
        email: 'teste@pebteste.com.br',
        password: '$2b$08$H08xkUGWe3vZCIRBBLbiFu65ARZzszuBeNLR2SXHjud7gGKKhQJk6',
      },
      {
        id: '456',
        email: 'teste@pebteste.com.br',
        password: 'invalid_password',
      },
    ];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.email === email);
    if (!findUser) return undefined;
    return new User(findUser.id, findUser.email, findUser.password);
  }
}