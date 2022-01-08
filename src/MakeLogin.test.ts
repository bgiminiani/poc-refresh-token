import EncryptMock from "./EncryptMock";
import MakeLogin from "./MakeLogin";
import User from "./User";

test('Não deve fazer login de usuário inexistente', async () => {
  const input = {
    email: 'anamaria@mail.com',
    password: '12345',
  };
  const user = new User(input.email, input.password);
  const encrypter = new EncryptMock();
  const makeLogin = new MakeLogin(encrypter);
  await expect(makeLogin.execute(user.email, user.password))
    .rejects
    .toThrow(new Error('User not found'));
});

test('Deve fazer login para usuário existente', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const user = new User(input.email, input.password);
  const encrypter = new EncryptMock();
  const makeLogin = new MakeLogin(encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.email).toBe(output.email);
});

test('Deve gerar um token de acesso para o usuário, após fazer login', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const user = new User(input.email, input.password);
  const encrypter = new EncryptMock();
  const makeLogin = new MakeLogin(encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.accessToken).toBe('#@#$%ˆ&');
});

test('Não deve fazer login de usuário com senha inválida', async() => {
  const input = {
    email: 'ana@mail.com',
    password: '',
  };
  const user = new User(input.email, input.password)
  const encrypter = new EncryptMock();
  const makeLogin = new MakeLogin(encrypter);
  await expect(makeLogin.execute(user.email, user.password))
    .rejects
    .toThrow(new Error('User not found'));
});

test('Deve gerar um token de atualização para o usuário, após fazer login', async () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const user = new User(input.email, input.password)
  const encrypter = new EncryptMock();
  const makeLogin = new MakeLogin(encrypter);
  const output = await makeLogin.execute(user.email, user.password);
  expect(output.refreshToken).toBe('#@#$%ˆ&');
});