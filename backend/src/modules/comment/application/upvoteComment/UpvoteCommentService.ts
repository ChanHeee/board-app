import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CommentVoteRepository } from "../../domain/repository/CommentVoteRepository"
import { BadRequest } from "../../../../shared/util/exceptions"

@injectable()
export class UpvoteCommentService {
  constructor(
    @inject(Types.CommentVoteRepository)
    private commentVoterepository: CommentVoteRepository
  ) {}

  async execute(commentId: number, userId: number) {
    const result = await this.commentVoterepository.upvote(commentId, userId)

    if (!result) {
      throw new BadRequest(`Fail to upvote the comment: [${commentId}].`)
    }
    return
  }
}
