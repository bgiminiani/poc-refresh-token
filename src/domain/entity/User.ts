export default class User {
  id: string; 
  email: string;
  private encryptedPassword: string;
  accessToken: string | undefined;
  refreshToken: string | undefined;

  constructor(
      id: string,
      email: string,
      encryptedPassword: string,
    ) {
    this.id = id; 
    this.email = email; 
    this.encryptedPassword = encryptedPassword; 
  }

  getEncryptedPassword() {
    return this.encryptedPassword;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
  }
}
