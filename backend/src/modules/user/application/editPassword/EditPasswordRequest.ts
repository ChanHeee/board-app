import { MinLength, IsString, MaxLength, IsEmail } from "class-validator"
import { UserPassword } from "../../domain/model/UserPassword"
export class EditPasswordRequest {
  id: number

  password: string

  @MinLength(8, { message: "Minimal length is 8" })
  @MaxLength(20, { message: "Maximal length is 20" })
  newPassword: string

  constructor(init?: Partial<EditPasswordRequest>) {
    Object.assign(this, init)
  }
}
