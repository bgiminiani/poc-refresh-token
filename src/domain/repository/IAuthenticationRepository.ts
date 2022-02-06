export default interface IAuthenticationRepository {
  save(userId: string, refreshToken: string): void;
}