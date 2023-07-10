import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { hashSync, compareSync } from "bcrypt"
import { UserRepository } from "../../domain/repository/UserRepository"
import { UserPassword } from "../../domain/model/UserPassword"
import { EditPasswordRequest } from "./EditPasswordRequest"
import { User } from "../../domain/model/User"
import { NotFound, Unauthorized } from "../../../../shared/util/exceptions"

@injectable()
export class EditPasswordService {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(dto: EditPasswordRequest): Promise<User> {
    const { id, password, newPassword } = dto
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFound(`Couldn't find a user by id {${id}}.`)
    }

    if (!user.comparePassword(password)) {
      throw new Unauthorized("Invalid Password.")
    }

    user.editPassword(newPassword)
    return await this.userRepository.save(user)
  }
}
