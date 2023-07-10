import {
  controller,
  httpPost,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { inject } from "inversify"
import Types from "../../../../config/Types"
import { UpvoteCommentService } from "./UpvoteCommentService"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { Response } from "express"

@controller("/api/comments")
export class UpvoteCommentController implements interfaces.Controller {
  constructor(
    @inject(Types.UpvoteCommentService)
    private upvoteCommentService: UpvoteCommentService
  ) {}
  @httpPost("/:id/upvote", EnsureAuthenticated)
  async execute(
    @request() req: AuthRequest,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    const commentId = id
    const userId = req.user.id

    await this.upvoteCommentService.execute(commentId, userId)
    return res.status(204).end()
  }
}
