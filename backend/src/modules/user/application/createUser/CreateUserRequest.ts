import { MinLength, IsString, MaxLength, IsEmail } from "class-validator"
import { UserPassword } from "../../domain/model/UserPassword"
import { UserEntity } from "../../infrastructure/UserEntity"
import { User } from "../../domain/model/User"
export class CreateUserRequest {
  @IsEmail()
  email: string

  @MinLength(4, { message: "Minimal length is 4" })
  @MaxLength(10, { message: "Maximal length is 10" })
  @IsString()
  username: string

  @MinLength(8, { message: "Minimal length is 8" })
  @MaxLength(20, { message: "Maximal length is 20" })
  @IsString()
  password: string

  constructor(init?: Partial<CreateUserRequest>) {
    Object.assign(this, init)
  }
}
