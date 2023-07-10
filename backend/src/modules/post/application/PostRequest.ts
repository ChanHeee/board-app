import { IsString, MaxLength, MinLength, ValidateIf } from "class-validator"
import { PostTitle } from "../domain/model/PostTitle"

export class PostRequest {
  @MinLength(5, { message: "Minimal length is 5" })
  @MaxLength(20, { message: "Maximal length is 20" })
  title: PostTitle

  @IsString()
  content: string

  @IsString({ each: true })
  @ValidateIf((object, value) => value != null)
  categories?: string[]

  constructor(init?: Partial<PostRequest>) {
    Object.assign(this, init)
  }

  static of(props) {
    const { title, content, categories } = props

    return new PostRequest({
      title: PostTitle.create(title),
      content,
      categories,
    })
  }
}
