import { inject } from "inversify"
import {
  controller,
  httpDelete,
  interfaces,
  request,
  response,
} from "inversify-express-utils"
import Types from "../../../../config/Types"

import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"

import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { Response } from "express"
import { DeleteCommentVoteService } from "./DeleteCommentVoteService"

@controller("/api/comments")
export class DeleteCommentVoteController implements interfaces.Controller {
  constructor(
    @inject(Types.DeleteCommentVoteService)
    private deleteCommentVoteService: DeleteCommentVoteService
  ) {}

  @httpDelete("/vote", EnsureAuthenticated)
  async excute(@request() req: AuthRequest, @response() res: Response) {
    const { commentId } = req.body
    const userId = req.user.id

    await this.deleteCommentVoteService.execute(commentId, userId)
    return res.status(204).end()
  }
}
