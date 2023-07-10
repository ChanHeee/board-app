import { define } from "typeorm-seeding"
import { faker } from "@faker-js/faker"
import { CommentEntity } from "../../modules/comment/infrastructure/CommentEntity"

define(CommentEntity, () => {
  const comment = new CommentEntity()
  const text = faker.lorem.sentence(6)
  const parentPostId = 1
  const parentCommentId = 1

  comment.text = text
  comment.parentPostId = parentPostId
  comment.parentCommentId = parentCommentId
  return comment
})
