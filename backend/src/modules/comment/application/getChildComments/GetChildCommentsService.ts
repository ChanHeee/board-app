import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CommentRepository } from "../../domain/repository/CommentRepository"
import { GetChildCommentsRequest } from "./GetChildCommentsRequest"
import { GetChildCommentsResponse } from "./GetChildCommentsResponse"

@injectable()
export class GetChildCommentsService {
  constructor(
    @inject(Types.CommentRepository)
    private commentRepository: CommentRepository
  ) {}

  async execute(
    dto: GetChildCommentsRequest
  ): Promise<GetChildCommentsResponse> {
    const { id, skip, take, me } = dto.value
    const [comments, total] = await this.commentRepository.findChildByPostId(
      id,
      skip,
      take,
      me
    )
    return GetChildCommentsResponse.of(comments, total, skip)
  }
}
