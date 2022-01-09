export default interface IValidatePassword {
  isValid(password: string): Promise<boolean>;
}