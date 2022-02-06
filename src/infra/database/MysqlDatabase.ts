import mysql from 'mysql'
import util from 'util';

import IDataBase from "./IDatabase";

export default class MysqlDatabase implements IDataBase {
  pool: any;
  connection: any;
  sql: any;

  constructor() {
    this.pool = this.createConnection();
    this.sql = util.promisify(this.pool.query).bind(this.pool);
  }

  async selectMany(query: string, parameters: any): Promise<any> {
    const result = await this.sql(query, parameters);
    return result;
  }

  async selectOne(query: string, parameters: any): Promise<any> {
    const results = await this.sql(query, parameters);
    return results[0];
  }

  async save(query: string, parameters: any): Promise<void> {
    await this.sql(query, parameters);
  }

  createConnection() {
    if (!this.pool) {
      this.pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'develop',
        password: 'qHsonkYHOFW1Q',
        database: 'pebmedapps',
        port: 32767,
      });
    }
    return this.pool;
  }
}
