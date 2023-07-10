import { CommentVote } from "../model/CommentVote"

export interface CommentVoteRepository {
  upvote(commentId: number, userId: number): Promise<CommentVote>
  downvote(commentId: number, userId: number): Promise<CommentVote>
  deleteVote(commentId: number, userId: number): Promise<Boolean>
}
