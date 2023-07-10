import { Post } from "../domain/model/Post"
import { PostTitle } from "../domain/model/PostTitle"
import { PostEntity } from "./PostEntity"

export class PostMapper {
  public static toDomain(entity: PostEntity): Post {
    const { categories, user, ...rest } = entity
    return Post.create({
      ...rest,
      categories: categories?.map((category) => category.toDomain()),
      user: user.toDomain(),
    })
  }
}
