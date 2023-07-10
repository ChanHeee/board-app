import { PostTitle } from "../../domain/model/PostTitle"
import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator"

export class UpdatePostRequest {
  id: number

  userId: number

  @MinLength(5, { message: "Minimal length is 5" })
  @MaxLength(40, { message: "Maximal length is 40" })
  title: string

  @IsString()
  content: string

  @IsString({ each: true })
  @ValidateIf((object, value) => value != null)
  categories?: string[]

  constructor(init?: Partial<UpdatePostRequest>) {
    Object.assign(this, init)
  }

  static create(props: Partial<UpdatePostRequest>) {
    return new UpdatePostRequest(props)
  }
}
