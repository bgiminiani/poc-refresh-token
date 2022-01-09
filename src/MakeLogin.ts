import IUserRepository from "./IUserRepository";
import User from "./User";

export default class MakeLogin {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string) {
    const user = new User(email, password);
    const findUser: any = this.userRepository.findByEmail(user.email);
    if (!findUser) throw new Error('User not found');
    const passwordIsValid = await user.isValid(findUser.password);
    if(!passwordIsValid) throw new Error('Invalid email or password');
    const { accessToken, refreshToken } = user;
    return {
      email,
      accessToken,
      refreshToken,
    };
  }
}