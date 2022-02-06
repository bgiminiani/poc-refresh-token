import IAuthenticationSuccessful from "./IAuthenticationSuccessful";
import User from "./User";

export default class AuthenticationSuccessful implements IAuthenticationSuccessful{
  accessToken: string;
  refreshToken: string;
  user: User;

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }

  getAuthenticatedUser(): User {
    this.user.setAccessToken(this.accessToken);
    this.user.setRefreshToken(this.refreshToken);
    return this.user;
  }
}