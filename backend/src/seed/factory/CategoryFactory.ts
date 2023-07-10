import { define } from "typeorm-seeding"
import { faker } from "@faker-js/faker"
import { CategoryEntity } from "../../modules/category/infrastructure/CategoryEntity"

define(CategoryEntity, () => {
  const category = new CategoryEntity()

  const name = faker.lorem.word({ length: { min: 5, max: 10 } })

  category.name = name
  return category
})
