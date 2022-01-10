export default interface IHashComparer {
  compare(plainText: string, encryptedText: string): Promise<boolean>;
}