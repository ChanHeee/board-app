import { inject, injectable } from "inversify"
import { User } from "../../domain/model/User"
import Types from "../../../../config/Types"
import { Conflict } from "../../../../shared/util/exceptions"
import { UserRepository } from "../../domain/repository/UserRepository"
import { CreateUserRequest } from "./CreateUserRequest"
import { UserResponse } from "../UserResponse"
import { UserPassword } from "../../domain/model/UserPassword"

@injectable()
export class CreateUserService {
  constructor(
    @inject(Types.UserRepository) private userRepository: UserRepository
  ) {}

  async execute(dto: CreateUserRequest): Promise<UserResponse> {
    const { email, username } = dto
    let exUser = await this.userRepository.findByEmail(email)
    if (exUser) {
      throw new Conflict(`Email {${email}} is already registered.`)
    }
    exUser = await this.userRepository.findByUserName(username)
    if (exUser) {
      throw new Conflict(`username {${username}} is already taken.`)
    }

    const user = User.create({ ...dto })

    const result = await this.userRepository.save(user)

    return UserResponse.of(result)
  }
}
