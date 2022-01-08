export default class MakeLogin {
  users: { email: string; password: string; }[];

  constructor() {
    this.users = [
      {
        email: 'ana@mail.com',
        password: '$2+#12345',
      },
    ];
  }

  execute(email: string, password: string) {
    const user: any = this.users.find(user => user.email === email && user.password === this.generateProtectedPassword(password));
    if (!user) throw new Error('User not found');
    user.accessToken = '#@#$%ˆ&';
    user.refreshToken = '#@#$%ˆ&';
    return {
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }

  generateProtectedPassword(password: string): string {
    if (isNaN(Number(password[0]))) throw new Error('User not found');
    const protectedPassword = `$2+#${password}`;
    return protectedPassword;
  }

}