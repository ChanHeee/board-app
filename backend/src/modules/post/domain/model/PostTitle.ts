export class PostTitle {
  private title: string
  public static maxLength: number = 40
  public static minLength: number = 3

  public get value(): string {
    return this.title
  }

  private constructor(title: string) {
    this.title = title
  }

  static create(title: string) {
    if (title.length < this.minLength) {
      throw new Error(
        `Minimal length is ${this.minLength}. [PostTitle Value Object]`
      )
    }
    if (title.length > this.maxLength) {
      throw new Error(
        `Maximal length is ${this.maxLength}. [PostTitle Value Object]`
      )
    }
    return new PostTitle(title)
  }

  static of(title: string) {
    return new PostTitle(title)
  }
}
