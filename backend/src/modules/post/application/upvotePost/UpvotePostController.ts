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
import { UpvotePostService } from "./UpvotePostService"

@controller("/api/posts")
export class UpvotePostController implements interfaces.Controller {
  constructor(
    @inject(Types.UpvotePostService)
    private upvotePostService: UpvotePostService
  ) {}

  @httpPost("/upvote", EnsureAuthenticated)
  async excute(@request() req: AuthRequest, @response() res: Response) {
    const { postId } = req.body
    const userId = req.user.id

    await this.upvotePostService.execute(postId, userId)
    return res.status(204).end()
  }
}
