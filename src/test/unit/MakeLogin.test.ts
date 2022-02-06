import UserRepositoryDatabse from '../../infra/repository/database/UserRepositoryDatabse'
import BcryptAdapter from '../../BcryptAdapter';
import MakeLogin from '../../application/MakeLogin';
import JsonWetTokenAdapter from '../../JsonWetTokenAdapter';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { TokenFailed } from '../../domain/entity/TokenFailed';
import IUserRepository from '../../domain/repository/IUserRepository';
import IAuthenticationRepository from '../../domain/repository/IAuthenticationRepository';
import AuthenticationRepositoryDatabase from '../../infra/repository/database/AuthenticationRepositoryDatabase';
import MysqlDatabase from '../../infra/database/MysqlDatabase';
import AuthenticationRepositoryInMemory from '../../infra/repository/memory/AuthenticationRepositoryInMemory';
import IDataBase from '../../infra/database/IDatabase';

let userRepository: IUserRepository;
let authenticationRepository: IAuthenticationRepository;
let hashComparator: BcryptAdapter;
let authenticator: JsonWetTokenAdapter;
let makeLogin: MakeLogin;
let mysql: MysqlDatabase; 


beforeEach(() => {
  mysql = new MysqlDatabase()
  userRepository = new UserRepositoryDatabse(mysql);
  authenticationRepository = new AuthenticationRepositoryDatabase(mysql);
  hashComparator = new BcryptAdapter(8);
  authenticator = new JsonWetTokenAdapter()
  makeLogin = new MakeLogin(
    userRepository,
    authenticationRepository,
    hashComparator, 
    authenticator
  )
})

test('Não deve fazer login de usuário inexistente', async () => {
  const input = {
    email: 'inexistent_mail@mail.com',
    password: '12345',
  };
  await expect(makeLogin.execute(input.email, input.password))
    .rejects
    .toThrow(new Error('User not found'));
});

test('Não deve fazer login de usuário com senha inválida', async() => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'invalid_password',
  };
  await expect(makeLogin.execute(input.email, input.password))
    .rejects
    .toThrow(new Error('Invalid email or password'));
});

test('Deve fazer login para usuário existente', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };

  const user = await makeLogin.execute(input.email, input.password);
  expect(input.email).toBe(user.email);
});

test('Não deve ocorrer a autenticação, caso o access token esteja expirado', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  jest.spyOn(authenticator, 'generateAccessToken')
    .mockImplementation(() => { 
      throw new TokenExpiredError('jwt expired', new Date()); 
    });
  const output = await makeLogin.execute(input.email, input.password);
  expect(output.getFail()).toBe(TokenFailed.acessToken);
});

test('Não deve ocorrer a autenticação, caso haja falha na construção do access token', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  jest.spyOn(authenticator, 'generateAccessToken')
    .mockImplementation(() => { 
      throw new JsonWebTokenError(
        'jwt building failure', 
        {name: 'JsonWebTokenError', message: 'jwt malformed'}
      );
    });
  const output = await makeLogin.execute(input.email, input.password);
  expect(output.getFail()).toBe(TokenFailed.acessToken);
});

test('Deve gerar um access token para o usuário, após fazer login', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  const output = await makeLogin.execute(input.email, input.password);
  expect(output).toHaveProperty('accessToken');
});

test('Não deve ocorrer a autenticação, caso o refresh token esteja expirado', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  jest.spyOn(authenticator, 'generateRefreshToken')
    .mockImplementation(() => { 
      throw new TokenExpiredError('jwt expired', new Date()); 
    });
  const output = await makeLogin.execute(input.email, input.password);
  expect(output.getFail()).toBe(TokenFailed.acessToken);
});

test('Não deve ocorrer a autenticação, caso haja falha na construção do refresh token', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  const result = await hashComparator.encrypt(input.password);
  jest.spyOn(authenticator, 'generateRefreshToken')
    .mockImplementation(() => { 
      throw new JsonWebTokenError(
        'jwt building failure',
        {name: 'JsonWebTokenError', message: 'jwt malformed'}
      );
    });
  const output = await makeLogin.execute(input.email, input.password);
  expect(output.getFail()).toBe(TokenFailed.acessToken);
});

test('Deve gerar um refresh token para o usuário, após fazer login', async () => {
  const input = {
    email: 'teste@pebteste.com.br',
    password: 'Teste123',
  };
  const output = await makeLogin.execute(input.email, input.password);
  expect(output).toHaveProperty('refreshToken');
});
