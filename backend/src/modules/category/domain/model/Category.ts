export class Category {
  id: number

  name: string

  private constructor(init?: Partial<Category>) {
    Object.assign(this, init)
  }

  static create(props: Partial<Category>) {
    return new Category(props)
  }
}
