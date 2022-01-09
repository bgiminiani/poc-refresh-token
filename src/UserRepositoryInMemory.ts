import IUserRepository from "./IUserRepository";
import User from "./User";

export default class UserRepositoryInMemory implements IUserRepository {
  users: User[] ;
  constructor() {
    this.users = [
      new User('ana@mail.com', '12345'),
      new User('invalid_password@mail.com', '12345')
    ];
  }
  findByEmail(email: string): User | undefined {
    const findUser = this.users.find(user => user.email === email);
    if (!findUser) return undefined;
    return new User(findUser.email, findUser.password);
  }

}