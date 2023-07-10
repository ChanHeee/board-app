import { User } from "../../../user/domain/model/User"
import { Post } from "../../../post/domain/model/Post"
export class Comment {
  id: number
  text: string
  userId: number
  parentPostId: number
  parentCommentId: number
  numChildComments: number
  user: User
  point: number
  like: Boolean
  createdAt: Date
  updatedAt: Date

  private constructor(init?: Partial<Comment>) {
    Object.assign(this, init)
  }

  static create(props: Partial<Comment>) {
    return new Comment(props)
  }
}
