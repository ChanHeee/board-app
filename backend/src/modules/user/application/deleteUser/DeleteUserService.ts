import { inject, injectable } from "inversify"

import Types from "../../../../config/Types"
import { UserRepository } from "../../domain/repository/UserRepository"

@injectable()
export class DeleteUserService {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(id: number): Promise<Boolean> {
    const result = await this.userRepository.delete(id)
    return result
  }
}
