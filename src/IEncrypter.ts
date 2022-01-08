export default interface IEncrypter {
  encrypt(plainText: string): Promise<string>;
}