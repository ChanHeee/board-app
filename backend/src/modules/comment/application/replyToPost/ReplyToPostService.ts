import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CommentRepository } from "../../domain/repository/CommentRepository"
import { ReplyToPostRequest } from "./ReplyToPostRequest"
import { PostRepository } from "../../../post/domain/repository/PostRepository"
import { NotFound } from "../../../../shared/util/exceptions"
import { Comment } from "../../domain/model/Comment"
import { CommentResponse } from "../CommentResponse"
import { UserRepository } from "../../../user/domain/repository/UserRepository"

@injectable()
export class ReplyToPostService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository,
    @inject(Types.CommentRepository)
    private commentRepository: CommentRepository,
    @inject(Types.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(dto: ReplyToPostRequest): Promise<CommentResponse> {
    const { parentPostId, user, text } = dto.value
    const post = await this.postRepository.findById(parentPostId)
    if (!post) {
      throw new NotFound(`Couldn't find a post by id: [${parentPostId}].`)
    }

    //! REPLY WITHOUT LOGIN FOR FE
    // const user1 = await this.userRepository.findByUserName("user1")
    // const comment = Comment.create({
    //   parentPostId,
    //   user: user1,
    //   text,
    // })
    //? ORIGINAL CODE
    const comment = Comment.create({ parentPostId, user, text })
    const result = await this.commentRepository.save(comment)
    return CommentResponse.of(result)
  }
}
