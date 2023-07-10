import { User } from "../../../user/domain/model/User"
import { IsString } from "class-validator"
export class ReplyToPostRequest {
  parentPostId: number
  user: User

  @IsString()
  text: string

  private constructor(init?: Partial<ReplyToPostRequest>) {
    Object.assign(this, init)
  }

  static create(props: Partial<ReplyToPostRequest>) {
    return new ReplyToPostRequest(props)
  }

  public get value() {
    return {
      parentPostId: this.parentPostId,
      user: this.user,
      text: this.text,
    }
  }
}
