export default class User {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;

  constructor(email: string, password: string) {
    this.email = email; 
    this.password = password;
    this.accessToken = '#@#$%ˆ&';
    this.refreshToken = '#@#$%ˆ&';
  }
}