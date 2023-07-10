export class GetManyPostsRequest {
  take: number
  skip: number
  order: string
  category: string
  user: string
  me?: number

  constructor(init?: Partial<GetManyPostsRequest>) {
    Object.assign(this, init)
  }

  static create(props) {
    const { skip, take, order, category, user, me } = props

    return new GetManyPostsRequest({
      skip: !parseInt(skip) ? 0 : parseInt(skip),
      take: !parseInt(take) ? 15 : parseInt(take),
      order: order ?? "popular",
      category,
      user,
      me: me ?? 0,
    })
  }

  public get value() {
    return {
      skip: this.skip,
      take: this.take,
      order: this.order,
      category: this.category,
      user: this.user,
      me: this.me,
    }
  }
}
