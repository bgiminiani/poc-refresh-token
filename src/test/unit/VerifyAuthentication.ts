export default class VerifyAuthentication {

  execute(accessToken: string, refreshToken: string): any {
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      isAuthenticade: true,
    }
  }
}