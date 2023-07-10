import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { PostRepository } from "../../domain/repository/PostRepository"
import { BadRequest, NotFound } from "../../../../shared/util/exceptions"
import { PostVoteRepository } from "../../domain/repository/PostVoteRepository"

@injectable()
export class UpvotePostService {
  constructor(
    @inject(Types.PostVoteRepository)
    private postVoteRepository: PostVoteRepository
  ) {}

  async execute(postId: number, userId: number) {
    const result = await this.postVoteRepository.upvote(postId, userId)
    if (!result) {
      throw new BadRequest(`Fail to upvote the post: [${postId}].`)
    }
    return
  }
}
