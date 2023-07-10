import { Comment } from "../domain/model/Comment"

export class CommentResponse {
  id: number
  parentPostId: number
  parentCommentId: number
  numChildComments: number
  point: number
  like: Boolean
  childComments: Comment[]
  text: string
  user: { id: number; username: string }
  createdAt: Date
  updatedAt: Date

  static of(comment: Comment): CommentResponse {
    const {
      id,
      parentPostId,
      parentCommentId,
      numChildComments,
      text,
      user,
      createdAt,
      updatedAt,
      point,
      like,
    } = comment
    return {
      id,
      parentPostId,
      parentCommentId,
      numChildComments: numChildComments || 0,
      childComments: [],
      point,
      like,
      text,
      user: { id: user.id, username: user.username },
      createdAt,
      updatedAt,
    }
  }
}
