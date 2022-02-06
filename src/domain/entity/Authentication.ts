import AuthenticationFail from '../../domain/entity/AuthenticationFail';
import AuthenticationSuccessful from '../../domain/entity/AuthenticationSuccessful';
import IAuthenticationProvider from './IAuthenticationProvider';
import User from './User';
export default class Authentication{
  authenticationProvider: any;

  constructor(authenticationProvider: IAuthenticationProvider) {
    this.authenticationProvider = authenticationProvider;
  }

  async authenticate(user: User): Promise<AuthenticationSuccessful | AuthenticationFail> {
    const data = { email: user.email }
    const authenticationResult = await this.authenticationProvider.authenticate(data);
    return authenticationResult;
  }
}
