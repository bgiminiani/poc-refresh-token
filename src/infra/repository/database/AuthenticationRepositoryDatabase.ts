import IAuthenticationRepository from "../../../domain/repository/IAuthenticationRepository";
import IDataBase from "../../database/IDatabase";

export default class AuthenticationRepositoryDatabase implements IAuthenticationRepository {
  database: IDataBase;

  constructor(database: IDataBase) {
    this.database = database;
  }

  async save(userId: string, refreshToken: string): Promise<void> {
    await this.database.save(
      `INSERT
        INTO pebmedapps.refresh_token(token, id_usuario)
      VALUES(?, ?);
      `,
      [refreshToken, userId]
    );
  }
}  