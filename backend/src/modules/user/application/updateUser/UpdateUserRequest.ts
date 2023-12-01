import {
  MinLength,
  IsString,
  MaxLength,
  IsEmail,
  ValidateIf,
} from "class-validator"
export class UpdateUserRequest {
  id: number

  @MinLength(4, { message: "Minimal length is 4" })
  @MaxLength(10, { message: "Maximal length is 10" })
  @IsString()
  @ValidateIf((object, value) => value != null)
  username: string

  @MinLength(8, { message: "Minimal length is 8" })
  @MaxLength(20, { message: "Maximal length is 20" })
  @IsString()
  @ValidateIf((object, value) => value != null)
  password: string

  constructor(init?: Partial<UpdateUserRequest>) {
    Object.assign(this, init)
  }

  static create(props: Partial<UpdateUserRequest>) {
    return new UpdateUserRequest(props)
  }
}
