import { Post } from "../domain/model/Post"

export class PostResponse {
  id: number
  title: string
  content: string
  userId?: number
  user?: { id: number; username: string }
  categories: string[]
  createdAt: Date
  updatedAt: Date
  numComments?: number
  point?: number
  like?: Boolean

  static of(post: Post): PostResponse {
    const {
      id,
      title,
      content,
      userId,
      user,
      categories,
      createdAt,
      updatedAt,
      numComments,
      point,
      like,
    } = post

    if (user) {
      return {
        id,
        title: title.value,
        content,
        user: { id: user.id, username: user.username },
        categories: categories?.map((category) => category.name),
        numComments,
        point,
        like,
        createdAt,
        updatedAt,
      }
    } else {
      return {
        id,
        title: title.value,
        content,
        userId,
        categories: categories?.map((category) => category.name),
        createdAt,
        updatedAt,
      }
    }
  }
}
