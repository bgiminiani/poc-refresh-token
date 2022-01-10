import BcryptAdapter from "./BcryptAdapter";
import MakeLogin from "./MakeLogin";
import User from "./User";
import UserRepositoryInMemory from "./UserRepositoryInMemory";

test('Não deve fazer login de usuário inexistente', async () => {
  const input = {
    email: 'inexistent_mail@mail.com',
    password: '12345',
  };
  const encrypter = new BcryptAdapter(8);
  const user = new User(input.email, input.password);
  const userRepository = new UserRepositoryInMemory();
  const makeLogin = new MakeLogin(userRepository, encrypter);
  await expect(makeLogin.execute(user.email, user.password))
    .rejects
    .toThrow(new Error('User not found'));
});

test('Deve fazer login para usuário existente', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const encrypter = new BcryptAdapter(8);
  const user = new User(input.email, input.password);
  const userRepository = new UserRepositoryInMemory();
  const makeLogin = new MakeLogin(userRepository, encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.email).toBe(output.email);
});

test('Deve gerar um token de acesso para o usuário, após fazer login', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const encrypter = new BcryptAdapter(8);
  const user = new User(input.email, input.password);
  const userRepository = new UserRepositoryInMemory();
  const makeLogin = new MakeLogin(userRepository, encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.accessToken).toBe('#@#$%ˆ&');
});

test('Não deve fazer login de usuário com senha inválida', async() => {
  const input = {
    email: 'ana@mail.com',
    password: 'invalid_password',
  };
  const encrypter = new BcryptAdapter(8);
  const user = new User(input.email, input.password);
  const userRepository = new UserRepositoryInMemory();
  const makeLogin = new MakeLogin(userRepository, encrypter);
  await expect(makeLogin.execute(user.email, user.password))
    .rejects
    .toThrow(new Error('Invalid email or password'));
});

test('Deve gerar um token de atualização para o usuário, após fazer login', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const encrypter = new BcryptAdapter(8);
  const user = new User(input.email, input.password);
  const userRepository = new UserRepositoryInMemory();
  const makeLogin = new MakeLogin(userRepository, encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.refreshToken).toBe('#@#$%ˆ&');
});
