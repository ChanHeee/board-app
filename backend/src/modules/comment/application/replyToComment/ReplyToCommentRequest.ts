import { User } from "../../../user/domain/model/User"
export class ReplyToCommentRequest {
  parentCommentId: number
  user: User
  text: string

  private constructor(init?: Partial<ReplyToCommentRequest>) {
    Object.assign(this, init)
  }

  static create(props: Partial<ReplyToCommentRequest>) {
    return new ReplyToCommentRequest(props)
  }

  public get value() {
    return {
      parentCommentId: this.parentCommentId,
      user: this.user,
      text: this.text,
    }
  }
}
