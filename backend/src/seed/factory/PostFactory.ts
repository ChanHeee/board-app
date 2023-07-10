import { define } from "typeorm-seeding"
import { faker } from "@faker-js/faker"
import { PostEntity } from "../../modules/post/infrastructure/PostEntity"

define(PostEntity, () => {
  const post = new PostEntity()
  const title = faker.lorem.words(3)
  const content = faker.lorem.words(6)

  post.title = title
  post.content = content
  return post
})
