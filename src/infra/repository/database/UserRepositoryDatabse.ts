import User from "../../../domain/entity/User";
import IUserRepository from "../../../domain/repository/IUserRepository";
import IDataBase from "../../database/IDatabase";

export default class UserRepositoryDatabse implements IUserRepository {
  database: IDataBase;

  constructor(database: IDataBase) {
    this.database = database;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userData = await this.database.selectOne(
      `SELECT
        u.id,
        e.email,
        u.senha 
      FROM 
        pebmedapps.tb_usuario u JOIN pebmedapps.email e
          ON u.id = e.id_usuario
      WHERE 
        email = ?`, email);
    if (!userData) return undefined;
    return new User(userData.id, userData.email, userData.senha);
  }
}  