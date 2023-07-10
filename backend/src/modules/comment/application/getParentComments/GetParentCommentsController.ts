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
import Types from "../../../../config/Types"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { GetParentCommentsService } from "./GetParentCommentsService"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { GetParentCommentsRequest } from "./GetParentCommentsRequest"
import { IncludeDecodedTokenIfExists } from "../../../../shared/middleware/authMiddleware"
import { validate } from "../../../../shared/middleware/validationMiddleware"

@controller("/api/comments")
export class GetParentCommentsController implements interfaces.Controller {
  constructor(
    @inject(Types.GetParentCommentsService)
    private service: GetParentCommentsService
  ) {}

  @httpGet("/parent/:id", IncludeDecodedTokenIfExists)
  async execute(
    @request() req: AuthRequest,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    let me
    if (req.user) {
      me = req.user.id
    }
    const dto = GetParentCommentsRequest.create({ id, ...req.query, me })
    const result = await this.service.execute(dto)
    return res.status(200).json({ ...result })
  }
}
