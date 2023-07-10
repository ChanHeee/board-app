import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CommentRepository } from "../../domain/repository/CommentRepository"

import { PostRepository } from "../../../post/domain/repository/PostRepository"
import { NotFound } from "../../../../shared/util/exceptions"
import { Comment } from "../../domain/model/Comment"
import { ReplyToCommentRequest } from "./ReplyToCommentRequest"
import { CommentResponse } from "../CommentResponse"
import { UserRepository } from "../../../user/domain/repository/UserRepository"

@injectable()
export class ReplyToCommentService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository,
    @inject(Types.CommentRepository)
    private commentRepository: CommentRepository,
    @inject(Types.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(dto: ReplyToCommentRequest): Promise<CommentResponse> {
    const { parentCommentId, user, text } = dto.value
    const comment = await this.commentRepository.findById(parentCommentId)
    if (!comment) {
      throw new NotFound(`Couldn't find a comment by id: [${parentCommentId}].`)
    }

    const newComment = Comment.create({
      parentPostId: comment.parentPostId,
      parentCommentId,
      user,
      text,
    })
    const result = await this.commentRepository.save(newComment)
    return CommentResponse.of(result)
  }
}
