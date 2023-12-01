import { inject } from "inversify"
import {
  controller,
  httpPost,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { NextFunction, Request, Response } from "express"
import Types from "../../../../config/Types"
import { validate } from "../../../../shared/middleware/validationMiddleware"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { ReplyToCommentService } from "./ReplyToCommentService"
import { ReplyToCommentRequest } from "./ReplyToCommentRequest"
import { CommentResponse } from "../CommentResponse"

@controller("/api/comments")
export class ReplyToCommentController implements interfaces.Controller {
  constructor(
    @inject(Types.ReplyToCommentService)
    private replyToCommentService: ReplyToCommentService
  ) {}

  @httpPost("/:id", EnsureAuthenticated, validate(ReplyToCommentRequest))
  async create(
    @request() req: BodyRequest<ReplyToCommentRequest>,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    const dto = ReplyToCommentRequest.create({
      parentCommentId: id,
      user: req.user,
      text: req.body.text,
    })
    const comment = await this.replyToCommentService.execute(dto)
    return res.status(200).json({ comment })
  }
}
