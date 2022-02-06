import AuthenticationFail from "./AuthenticationFail";
import User from "./User";

export default interface IAuthenticationProvider {
  authenticate(data: any): Promise<User | AuthenticationFail>;
}