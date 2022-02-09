import VerifyAuthentication from "./VerifyAuthentication";

test.only('Deve retornar autenticado para usuário com tokens não expirados', () => {
  const accessToken = 'valid_accessToken';
  const refreshToken = 'valid_refreshToken';
  const output = new VerifyAuthentication().execute(accessToken, refreshToken);
  expect(output.accessToken).toBe(accessToken);
  expect(output.refreshToken).toBe(refreshToken);
  expect(output.isAuthenticated).toBeTruthy;
})