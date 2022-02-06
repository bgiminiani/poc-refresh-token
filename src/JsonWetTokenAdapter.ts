import { sign } from 'jsonwebtoken';
import AuthenticationFail from './domain/entity/AuthenticationFail';
import ITokenOptions from './IDataTokenInput';
import IDataTokenInput from './IDataTokenInput';
import { TokenFailed } from './domain/entity/TokenFailed';
import IAuthenticationProvider from './domain/entity/IAuthenticationProvider';

export default class JsonWetTokenAdapter implements IAuthenticationProvider{
  accessPrivatekey: string;
  accessTokenOptions: any; 
  refreshPrivatekey: string;
  refreshTokenOptions: any;

  constructor(
    accessTokenOptions?: ITokenOptions,
    refreshTokenOptions?: ITokenOptions,
  ){
    this.accessPrivatekey = 'accessPrivatekey';
    this.refreshPrivatekey = 'refreshToken';
    this.accessTokenOptions = accessTokenOptions || { expiresIn: '5min'};
    this.refreshTokenOptions = refreshTokenOptions || { expiresIn: '10d'};
  }

  async authenticate(data: any): Promise<any> {
    try {
      const accessToken = await this.generateAccessToken(data);
      const refreshToken = await this.generateRefreshToken(data);
      return {
        accessToken,
        refreshToken,
      }
    } catch (error) {
      return new AuthenticationFail(TokenFailed.acessToken, error);
    }
  }

  async generateAccessToken(data: any): Promise<any> {
    const accessToken = sign(
      data,
      this.accessPrivatekey,
      this.accessTokenOptions
    );
    return accessToken;
  }

  async generateRefreshToken(data: IDataTokenInput): Promise<any> {
    try {
      const refreshToken = sign(
        data,
        this.refreshPrivatekey,
        this.refreshTokenOptions,
      );
      return refreshToken;
    } catch (error) {
      return new AuthenticationFail(TokenFailed.refreshToken, error);
    }
  }

}