export default class MakeLogin {
  users: { email: string; password: string; }[];

  constructor() {
    this.users = [
      {
        email: 'ana@mail.com',
        password: '12345',
      },
    ];
  }

  execute(email: string, password: string) {
    const user: any = this.users.find(user => user.email === email && user.password === password);
    if (!user) throw new Error('User not found');
    user.token = '#@#$%ˆ&';
    return {
      email: user.email,
      token: user.token,
    };
  }

}