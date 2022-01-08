export default class MakeLogin {
  users: { email: string; password: string; }[];

  constructor() {
    this.users = [
      {
        email: '',
        password: '',
      },
    ];
  }

  execute(email: string, password: string) {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (!user) throw new Error('User not found');
  }
}