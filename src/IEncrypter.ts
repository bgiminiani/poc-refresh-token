export default interface IEncrypter {
  compare(plainText: string, encryptedText: string): Promise<boolean>;
}