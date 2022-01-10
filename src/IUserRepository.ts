import User from "./User";

export default interface IUserRepository {
  findByEmail(email: string): User | undefined;
}
