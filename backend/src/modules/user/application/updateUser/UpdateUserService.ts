import { inject, injectable } from "inversify"

import Types from "../../../../config/Types"
import { UserRepository } from "../../domain/repository/UserRepository"
import { UpdateUserRequest } from "./UpdateUserRequest"
import { User } from "../../domain/model/User"
import { NotFound } from "../../../../shared/util/exceptions"
import { UserResponse } from "../UserResponse"

@injectable()
export class UpdateUserService {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(dto: UpdateUserRequest): Promise<UserResponse> {
    const { id, username, password } = dto

    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFound(`Couldn't find a user by id: [${id}].`)
    }
    user.update({ username, password })

    const result = await this.userRepository.save(user)

    return UserResponse.of(result)
  }
}
