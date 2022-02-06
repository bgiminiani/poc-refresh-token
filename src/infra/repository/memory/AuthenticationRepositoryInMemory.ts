import IAuthenticationRepository from "../../../domain/repository/IAuthenticationRepository";

export default class AuthenticationRepositoryInMemory implements IAuthenticationRepository {
  refreshTokens : string[];

  constructor() {
    this.refreshTokens = [
      '01234',
      '56789',
      'abcde'
    ];
  }

  save(refreshToken: string): void {
    this.refreshTokens.push(refreshToken);
  }

}