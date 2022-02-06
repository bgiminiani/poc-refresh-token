import User from "../entity/User";

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
}
