import { inject } from "inversify"
import {
  controller,
  httpGet,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils"

import { Request, Response } from "express"
import { PostResponse } from "../PostResponse"
import Types from "../../../../config/Types"
import { GetPostService } from "./GetPostService"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { IncludeDecodedTokenIfExists } from "../../../../shared/middleware/authMiddleware"

@controller("/api/posts")
export class GetPostController implements interfaces.Controller {
  constructor(
    @inject(Types.GetPostService) private getPostService: GetPostService
  ) {}

  @httpGet("/:id", IncludeDecodedTokenIfExists)
  async get(
    @request() req: AuthRequest,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    let userId
    if (req.user) {
      userId = req.user.id
    }

    const post = await this.getPostService.execute(id, userId)
    return res.status(200).json({ post })
  }
}
