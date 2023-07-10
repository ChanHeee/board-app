import { PostVote } from "../model/PostVote"

export interface PostVoteRepository {
  upvote(postId: number, userId: number): Promise<PostVote>
  downvote(postId: number, userId: number): Promise<PostVote>
  deleteVote(postId: number, userId: number): Promise<Boolean>
  countByPostId(postId: number): Promise<number>
  getVoteForPostByUserId(postId: number, userId: number): Promise<PostVote>
}
