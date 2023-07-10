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
import { GetChildCommentsService } from "./GetChildCommentsService"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { GetChildCommentsRequest } from "./GetChildCommentsRequest"

@controller("/api/comments")
export class GetChildCommentsController implements interfaces.Controller {
  constructor(
    @inject(Types.GetChildCommentsService)
    private service: GetChildCommentsService
  ) {}

  @httpGet("/child/:id")
  async execute(
    @request() req: AuthRequest,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    let me
    if (req.user) {
      me = req.user.id
    }

    const dto = GetChildCommentsRequest.create({ id, ...req.query, me })
    const result = await this.service.execute(dto)
    return res.status(200).json({ ...result })
  }
}
