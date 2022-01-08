import MakeLogin from "./MakeLogin";

test('Não deve fazer login de usuário inexistente', () => {
  const input = {
    email: 'ana@mail.com',
    password: '12345',
  };
  const makeLogin = new MakeLogin();
  expect(() => makeLogin.execute(input.email, input.password)).toThrow(new Error('User not found'));
});