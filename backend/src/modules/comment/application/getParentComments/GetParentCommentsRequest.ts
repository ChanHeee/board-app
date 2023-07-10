export class GetParentCommentsRequest {
  id: number
  take: number
  skip: number
  me: number

  constructor(init?: Partial<GetParentCommentsRequest>) {
    Object.assign(this, init)
  }

  static create(props) {
    const { id, skip, take, me } = props

    return new GetParentCommentsRequest({
      id,
      skip: !parseInt(skip) ? 0 : parseInt(skip),
      take: !parseInt(take) ? 15 : parseInt(take),
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
