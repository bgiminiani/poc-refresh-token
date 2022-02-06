export default interface IDataBase {
  selectMany(query: string, parameters: any): Promise<any>;
  selectOne(query: string, parameters: any): Promise<any>;
  save(query: string, parameters: any): Promise<void>;
}