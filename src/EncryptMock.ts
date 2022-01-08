import IEncrypter from "./IEncrypter";

export default class EncryptMock implements IEncrypter{
  async encrypt(plainText: string): Promise<string> {
    if (plainText === '') return '';
    const reverseText = plainText.split('').join('');
    return reverseText ;
  }

}