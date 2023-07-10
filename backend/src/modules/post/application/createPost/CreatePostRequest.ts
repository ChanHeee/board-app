import { IsString, MaxLength, MinLength, ValidateIf } from "class-validator"
import { PostTitle } from "../../domain/model/PostTitle"
import { User } from "../../../user/domain/model/User"

export class CreatePostRequest {
  @MinLength(5, { message: "Minimal length is 5" })
  @MaxLength(40, { message: "Maximal length is 40" })
  title: string

  @IsString()
  content: string

  userId: number

  @IsString({ each: true })
  @ValidateIf((object, value) => value != null)
  categories?: string[]

  constructor(init?: Partial<CreatePostRequest>) {
    Object.assign(this, init)
  }

  static create(props: Partial<CreatePostRequest>) {
    return new CreatePostRequest(props)
  }
}
