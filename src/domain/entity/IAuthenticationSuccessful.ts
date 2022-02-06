import User from "./User";

export default interface IAuthenticationSuccessful {
  getAuthenticatedUser(): User;
}