import { Comment } from "../../domain/model/Comment"
import { CommentResponse } from "../CommentResponse"

export class GetParentCommentsResponse {
  comments: CommentResponse[]
  total: number
  take: number
  skip: number

  static of(comments: Comment[], total: number, skip: number) {
    return {
      comments: comments.map((comment) => CommentResponse.of(comment)),
      total,
      skip,
      take: comments.length,
    }
  }
}
