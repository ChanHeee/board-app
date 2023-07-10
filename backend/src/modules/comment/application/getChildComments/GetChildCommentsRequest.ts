export class GetChildCommentsRequest {
  id: number
  take: number
  skip: number
  me: number

  constructor(init?: Partial<GetChildCommentsRequest>) {
    Object.assign(this, init)
  }

  static create(props) {
    const { id, skip, take, me } = props

    return new GetChildCommentsRequest({
      id,
      skip: !parseInt(skip) ? 0 : parseInt(skip),
      take: !parseInt(take) ? 9 : parseInt(take),
      me: me ?? 0,
    })
  }

  public get value() {
    return {
      id: this.id,
      skip: this.skip,
      take: this.take,
      me: this.me,
    }
  }
}
