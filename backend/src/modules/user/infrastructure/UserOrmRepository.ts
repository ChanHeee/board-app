import { inject, injectable } from "inversify"
import { DataSource, Repository } from "typeorm"
import { UserEntity } from "./UserEntity"
import { UserRepository } from "../domain/repository/UserRepository"
import Types from "../../../config/Types"
import { User } from "../domain/model/User"
import { UserMapper } from "./UserMapper"

@injectable()
export class UserOrmRepository implements UserRepository {
  private readonly repository: Repository<UserEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserEntity)
  }
  async save(user: User): Promise<User> {
    const newUser = await this.repository.save(UserEntity.of(user))
    return newUser.toDomain()
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } })
    if (!user) {
      return null
    }
    return UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } })
    if (!user) {
      return null
    }
    return UserMapper.toDomain(user)
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } })
    if (!user) {
      return null
    }
    return UserMapper.toDomain(user)
  }

  async update(id: number, partial: Partial<User>): Promise<Boolean> {
    const { password, ...rest } = partial
    const result = await this.repository.update(id, {
      password: password.value,
      ...rest,
    })
    return !!result
  }

  async delete(id: number): Promise<Boolean> {
    const { affected } = await this.repository.delete({ id })
    return !!affected
  }
}
