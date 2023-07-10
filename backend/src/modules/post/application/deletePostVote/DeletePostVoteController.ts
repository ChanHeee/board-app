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
import { DeletePostVoteService } from "./DeletePostVoteService"

@controller("/api/posts")
export class DeletePostVoteController implements interfaces.Controller {
  constructor(
    @inject(Types.DeletePostVoteService)
    private deletePostVoteService: DeletePostVoteService
  ) {}

  @httpDelete("/vote", EnsureAuthenticated)
  async excute(@request() req: AuthRequest, @response() res: Response) {
    const { postId } = req.body
    const userId = req.user.id

    await this.deletePostVoteService.execute(postId, userId)
    return res.status(204).end()
  }
}
