import { inject, injectable } from "inversify"

import { User } from "../../domain/model/User"
import Types from "../../../../config/Types"
import { UserRepository } from "../../domain/repository/UserRepository"
import { NotFound } from "../../../../shared/util/exceptions"
import { UserResponse } from "../UserResponse"

@injectable()
export class GetUserService {
  constructor(
    @inject(Types.UserRepository) private userRepository: UserRepository
  ) {}

  async execute(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFound(`Couldn't find a user by id {${id}}.`)
    }
    return UserResponse.of(user)
  }
}
