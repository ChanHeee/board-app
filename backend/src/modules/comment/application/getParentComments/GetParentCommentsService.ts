import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CommentRepository } from "../../domain/repository/CommentRepository"
import { GetParentCommentsRequest } from "./GetParentCommentsRequest"
import { GetParentCommentsResponse } from "./GetParentCommentsResponse"

@injectable()
export class GetParentCommentsService {
  constructor(
    @inject(Types.CommentRepository)
    private commentRepository: CommentRepository
  ) {}

  async execute(
    dto: GetParentCommentsRequest
  ): Promise<GetParentCommentsResponse> {
    const { id, skip, take, me } = dto.value
    const [comments, total] = await this.commentRepository.findParentByPostId(
      id,
      skip,
      take,
      me
    )
    return GetParentCommentsResponse.of(comments, total, skip)
  }
}
