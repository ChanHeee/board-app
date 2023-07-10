import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { BadRequest, NotFound } from "../../../../shared/util/exceptions"
import { CommentVoteRepository } from "../../domain/repository/CommentVoteRepository"

@injectable()
export class DeleteCommentVoteService {
  constructor(
    @inject(Types.CommentVoteRepository)
    private commentVoteRepository: CommentVoteRepository
  ) {}

  async execute(commentId: number, userId: number) {
    const result = await this.commentVoteRepository.deleteVote(
      commentId,
      userId
    )
    if (!result) {
      throw new BadRequest(`Fail to delete a vote`)
    }
    return
  }
}
