import { hashSync } from "bcrypt"
export class UserPassword {
  private password: string
  public static minLength: number = 8
  public static maxLength: number = 20

  public get value(): string {
    return this.password
  }

  private constructor(password: string) {
    this.password = password
  }

  static create(password: string) {
    if (password.length < this.minLength) {
      throw new Error(
        `Minimal length is ${this.minLength}. [UserPassword Value Object]`
      )
    }
    if (password.length > this.maxLength) {
      throw new Error(
        `Maximal length is ${this.maxLength}. [UserPassword Value Object]`
      )
    }

    return new UserPassword(hashSync(password, 10))
  }

  static of(password: string) {
    return new UserPassword(password)
  }
}
