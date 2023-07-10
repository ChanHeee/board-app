import { inject } from "inversify"
import {
  controller,
  httpGet,
  interfaces,
  queryParam,
  request,
  requestParam,
  response,
} from "inversify-express-utils"
import { Request, Response } from "express"
import { GetManyPostsService } from "./GetManyPostsService"
import Types from "../../../../config/Types"
import { GetManyPostsRequest } from "./GetManyPostsRequest"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { IncludeDecodedTokenIfExists } from "../../../../shared/middleware/authMiddleware"

@controller("/api/posts")
export class GetManyPostsController implements interfaces.Controller {
  constructor(
    @inject(Types.GetManyPostsService)
    private service: GetManyPostsService
  ) {}

  @httpGet("/", IncludeDecodedTokenIfExists)
  async getPosts(@request() req: AuthRequest, @response() res: Response) {
    let me
    if (req.user) {
      me = req.user.id
    }
    const dto = GetManyPostsRequest.create({ ...req.query, me })
    const result = await this.service.execute(dto)

    return res.status(200).json({ ...result })
  }
}
