export default interface ITokenOptions {
  algorithm?: string,
  expiresIn?: number,
  audience?: string[],
  issuer?: string,
  subject?: string,
}

export default interface IDataTokenInput {
  payload: any;
  privateKey: string,
  tokenOptions: ITokenOptions,
}