import { define } from "typeorm-seeding"
import { UserEntity } from "../../modules/user/infrastructure/UserEntity"
import { faker } from "@faker-js/faker"
import { hashSync } from "bcrypt"

define(UserEntity, () => {
  const user = new UserEntity()
  const email = faker.internet.email()
  const username = faker.name.fullName()
  const password = hashSync("qwf123!!", 10)

  user.email = email
  user.username = username
  user.password = password
  return user
})
