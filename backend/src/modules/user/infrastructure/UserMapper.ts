import { User } from "../domain/model/User"
import { UserPassword } from "../domain/model/UserPassword"
import { UserEntity } from "./UserEntity"

export class UserMapper {
  public static newDomain(raw: any): User {
    const { password, ...rest } = raw
    return new User({
      ...rest,
      password: UserPassword.create(password),
    })
  }

  public static toDomain(raw: any): User {
    const { password, ...rest } = raw
    return new User({
      ...rest,
      password: UserPassword.of(password),
    })
  }

  public static toPersistence(user: User): UserEntity {
    const { password, ...rest } = user
    return new UserEntity({ password: password.value, ...rest })
  }
}
