import IAuthenticationFail from "./IAuthenticationFail";
import { TokenFailed } from "./TokenFailed";

export default class AuthenticationFail implements IAuthenticationFail{
  tokenFailed: TokenFailed;
  error: any

  constructor(tokenFailed: TokenFailed, error: any) {
    this.tokenFailed = tokenFailed;
  }

  getFail(): TokenFailed {
    if (this.tokenFailed === TokenFailed.acessToken) return TokenFailed.acessToken;
    return TokenFailed.refreshToken;
  }

}