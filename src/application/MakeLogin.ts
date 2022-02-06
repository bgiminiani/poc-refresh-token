import IUserRepository from "../domain/repository/IUserRepository";
import IAuthenticationRepository from '../domain/repository/IAuthenticationRepository';
import AuthenticationFail from "../domain/entity/AuthenticationFail";
import Authentication from "../domain/entity/Authentication";
import AuthenticationSuccessful from "../domain/entity/AuthenticationSuccessful";
import IEncrypter from "../IEncrypter";
import IAuthenticationProvider from "../domain/entity/IAuthenticationProvider";

export default class MakeLogin {
  userRepository: IUserRepository;
  encrypter: IEncrypter;
  authenticationRepository: IAuthenticationRepository;
  authenticatorProvider: IAuthenticationProvider;

  constructor(
    userRepository: IUserRepository, 
    authenticationRepository: IAuthenticationRepository,
    encrypter: IEncrypter,
    authenticatorProvider: IAuthenticationProvider 
    ) {
    this.userRepository = userRepository;
    this.authenticationRepository = authenticationRepository;
    this.encrypter = encrypter;
    this.authenticatorProvider = authenticatorProvider;
  }

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const passwordMatch = await this.encrypter.compare(password,user.getEncryptedPassword());
    if(!passwordMatch) throw new Error('Invalid email or password');

    const authenticator = new Authentication(this.authenticatorProvider);
    const authentication = await authenticator.authenticate(user);
    if (authentication instanceof AuthenticationFail) {
      return new AuthenticationFail(authentication.getFail(), authentication);
    } 
    const { accessToken, refreshToken } = authentication;
    const authenticatedUser = new AuthenticationSuccessful(accessToken, refreshToken, user).getAuthenticatedUser();
    this.authenticationRepository.save(authenticatedUser.id, refreshToken);
    return user; 
  }
}
