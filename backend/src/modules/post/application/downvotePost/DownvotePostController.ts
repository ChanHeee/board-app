import { inject } from "inversify"
import {
  controller,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils"
import Types from "../../../../config/Types"

import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"

import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { Response } from "express"
import { DownvotePostService } from "./DownvotePostService"

@controller("/api/posts")
export class DownvotePostController implements interfaces.Controller {
  constructor(
    @inject(Types.DownvotePostService)
    private downvotePostService: DownvotePostService
  ) {}

  @httpPost("/downvote", EnsureAuthenticated)
  async excute(@request() req: AuthRequest, @response() res: Response) {
    const { postId } = req.body
    const userId = req.user.id

    await this.downvotePostService.execute(postId, userId)
    return res.status(204).end()
  }
}
