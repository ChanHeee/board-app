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
import {
  protect,
  EnsureAuthenticated,
} from "../../../../shared/middleware/authMiddleware"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { ReplyToPostService } from "./ReplyToPostService"
import { ReplyToPostRequest } from "./ReplyToPostRequest"
import { CommentResponse } from "../CommentResponse"

@controller("/api/comments")
export class ReplyToPostController implements interfaces.Controller {
  constructor(
    @inject(Types.ReplyToPostService)
    private replyToPostService: ReplyToPostService
  ) {}

  //! REPLY WITHOUT LOGIN FOR FE
  // @httpPost("/post/:id", validate(ReplyToPostRequest))
  //? ORIGINAL CODE
  @httpPost("/post/:id", EnsureAuthenticated, validate(ReplyToPostRequest))
  async create(
    @request() req: BodyRequest<ReplyToPostRequest>,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    const dto = ReplyToPostRequest.create({
      parentPostId: id,
      user: req.user,
      text: req.body.text,
    })
    const comment = await this.replyToPostService.execute(dto)
    return res.status(200).json({ comment })
  }
}
