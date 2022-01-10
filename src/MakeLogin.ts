import IHashComparer from "./IHashComparer";
import IUserRepository from "./IUserRepository";
import User from "./User";

export default class MakeLogin {
  userRepository: IUserRepository;
  hashComparer: IHashComparer;

  constructor(userRepository: IUserRepository, hashComparer: IHashComparer) {
    this.userRepository = userRepository;
    this.hashComparer = hashComparer;
  }

  async execute(email: string, password: string) {
    const user = new User(email, password);
    const findUser = this.userRepository.findByEmail(user.email);
    if (!findUser) throw new Error('User not found');
    const passwordMatch = await this.hashComparer.compare(password,findUser.password);
    if(!passwordMatch) throw new Error('Invalid email or password');
    const { accessToken, refreshToken } = user;
    return {
      email,
      accessToken,
      refreshToken,
    };
  }
}